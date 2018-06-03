var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK_URL));
console.log('process.env.NETWORK_URL ', process.env.NETWORK_URL);


var Web3EthAccounts = require('web3-eth-accounts');
var account = new Web3EthAccounts(process.env.NETWORK_URL);

/**
 *
 * Web3, Network Functions
 */
var solc = require('solc');

var DEFAULT_GAS = 150000;
var DEFAULT_GAS_PRICE = '1';

exports.isListening = function () {
    console.log('process.env.NETWORK_URL ', process.env.NETWORK_URL);
    return web3.eth.net.isListening();
};

exports.isSyncing = function () {
    return web3.eth.isSyncing();
};

exports.getVersion = function () {
    // Not Working
    return web3.version;
};

exports.getNetwork = function () {
    // Not Working
    return web3.version.getNetwork();
};

exports.getBlockNumber = function () {
    return web3.eth.getBlockNumber();
};

exports.getStorageAt = function (accountAddress) {
    return web3.eth.getStorageAt(accountAddress);
};

exports.filter = function (status) {
    // Not Working
    return web3.eth.filter(status);
};

exports.getGasPrice = function () {
    return web3.eth.getGasPrice();
};

exports.createAccountWithWallet = async function (password) {
    var newAccount = await web3.eth.accounts.create();
    web3.eth.accounts.wallet.add(newAccount.privateKey);
    // web3.eth.accounts.wallet.save(password, password); // This method is not working
    return newAccount;
};

exports.register = function (accountAddress) {
    // Not Working
    return web3.eth.register(accountAddress);
};

/**
 *
 * Accounts Functions
 */

exports.createAccount = function () {
    /* *
     * Create Account Local Machine Only.
     * It will NOT show accounts in web3.eth.getAccounts(); call
     */
    return web3.eth.accounts.create();
};

exports.createPersonalAccount = function (password) {
    /* *
     * Create Account in Node.
     * It will SHOW accounts in web3.eth.getAccounts(); call
     */
    return web3.eth.personal.newAccount(password);
};

exports.unlockAccountPersonalAccount = function (accountAddress, password) {
    return web3.eth.personal.unlockAccount(accountAddress, password, 15000);
};

exports.unlockAccountPersonalCoinbaseAccount = async function () {
    return web3.eth.personal.unlockAccount(await this.getCoinbase());
};

exports.defaultAccount = function () {
    return web3.eth.defaultAccount;
};

exports.getAccounts = function () {
    return web3.eth.getAccounts();
};

exports.accounts = function () {
    return web3.eth.accounts;
};

exports.getBalance = function (accountAddress) {
    return web3.eth.getBalance(accountAddress);
};

exports.getCoinbase = function () {
    return web3.eth.getCoinbase();
};

exports.encyptAccount = function (privateKey, password) {
    return web3.eth.accounts.encrypt(privateKey, password);
};

exports.createAccountThirdParty = function () {
    return account.create();
};

/**
 *
 * Account's Wallet Functions
 */
exports.createWallet = function (numberOfAccounts, entropy) {
    return web3.eth.accounts.wallet.create(numberOfAccounts, entropy);
};

exports.loadAccountFromWallet = async function (password) {
    // This method is not working
    return web3.eth.accounts.wallet.load(password, password);
};

/**
 *
 * Transactions Functions
 */
exports.sendTransaction = function (data) {
    console.log('data ', data);
    return web3.eth.sendTransaction(data);
};

exports.getTransactionReceipt = function (transactionHash) {
    return web3.eth.getTransactionReceipt(transactionHash);
};


/**
 *
 * Other Functions
 */
exports.trialOnly = async function () {
    web3.eth.getAccounts().then(console.log);
};

/**
 *
 * Contract Functions
 */

exports.compileContract = async function (fileSource) {
    /* *
     * Compile the contract using solc
     * So, Let contracts method can be accessible.
     */
    return solc.compile(fileSource, 1);
};

exports.getContractInstance = function (contractInterface, accountAddress, options) {
    /* *
     * Creates the instance of the Contract to be use for other methods
     *
     */
    try {
        var myContractInstance = new web3.eth.Contract(contractInterface, {
            gas: DEFAULT_GAS,
            gasPrice: DEFAULT_GAS_PRICE,
            from: accountAddress
        });
        return myContractInstance;
    } catch (Exception) {
        console.log('getContractInstance Exception ', Exception);
        process.exit(0);
    }
};

exports.getRemoteContractInstance = function (contractInterface, contractAddress, options) {
    /* *
     * Creates the instance of the Remote Contract to be use for other methods
     * It will only executes if contract already deployed
     */
    try {
        var myRemoteContractInstance = new web3.eth.Contract(contractInterface, contractAddress);
        return myRemoteContractInstance;
    } catch (Exception) {
        console.log('getRemoteContractInstance Exception ', Exception);
        process.exit(0);
    }
};

exports.deployContract = async function (contractInterface, contractByteCode, accountAddress, options) {
    /* *
    * Trying to Deploy the Transaction
    * So, Let contracts method can be accessible.
    */
    return new Promise(async (resolve, reject) => {
        try {
            var myContractInstance = this.getContractInstance(contractInterface, accountAddress, options);

            /**
             * Their is no need to provide gas, gasPrice
             */
            var transactionContract = myContractInstance.deploy({
                data: '0x' + contractByteCode,
                arguments: []
            });
            console.log('Start sending contract');
            transactionContract.send({}, function (error, transactionHash) {
                if (error) {
                    console.log('deployContract error ', error);
                    return reject(error);
                }
                console.log('You should wait until the transaction get mined');
                // console.log('transactionHash ', transactionHash);
                return resolve(transactionHash);
            }).on('error', function (error) {
                console.log('deployContract error ', error);
                process.exit(0);
            }).on('transactionHash', function (transactionHash) {
                console.log('deployContract transactionHash ', transactionHash);
            }).on('receipt', function (receipt) {
                // console.log('deployContract has been mined. receipt ', receipt); // contains the new contract address
                // console.log(' deployContract receipt.contractAddress ', receipt.contractAddress); // contains the new contract address
            }).on('confirmation', function (confirmationNumber, receipt) {
                // console.log('confirmationNumber ', confirmationNumber);
                // console.log('receipt ', receipt);
            }).then(async (newContractInstance) => {
                // console.log('newContractInstance ', newContractInstance);
                // console.log(newContractInstance.options.address); // instance with the new contract address
            });
        } catch (Exception) {
            console.log('deployContract Exception ', Exception);
            return reject(Exception);
        }
    });
};

exports.getData = async function (contractInterface, contractAddress, options) {
    try {
        console.log('contractAddress ', contractAddress);
        var myContractInstance = this.getRemoteContractInstance(contractInterface, contractAddress, options);
        var sendResponse = await myContractInstance.methods.getData().call();
        console.log('sendResponse ', sendResponse);
        return sendResponse;
    } catch (Exception) {
        console.log('getData Exception ', Exception);
        process.exit(0);
    }
};

exports.waitBlockToBeMine = async function (transactionHash) {
    return new Promise((resolve, reject) => {
        var clearIntervalId = setInterval(async () => {
            try {
                var receipt = await this.getTransactionReceipt(transactionHash);
                if (receipt && receipt.contractAddress) {
                    console.log('Your contract has been deployed at ' + receipt.contractAddress);
                    console.log('Note that it might take 30 - 90 seconds for the block to propagate before it\'s visible in etherscan.io');
                    clearInterval(clearIntervalId);
                    resolve(receipt);
                } else {
                    console.log('Waiting a mined block to include your contract... currently in block ');
                }
            } catch (Exception) {
                console.log('waitBlock Exception ', Exception);
                reject(Exception);
            }
        }, 4000);
    });
};