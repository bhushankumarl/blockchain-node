var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK_URL));

var Web3EthAccounts = require('web3-eth-accounts');
var account = new Web3EthAccounts(process.env.NETWORK_URL);

var solc = require('solc');

exports.isListening = function () {
    console.log('process.env.NETWORK_URL ', process.env.NETWORK_URL);
    return web3.eth.net.isListening();
};

exports.isSyncing = function () {
    console.log('process.env.NETWORK_URL ', process.env.NETWORK_URL);
    return web3.eth.isSyncing();
};

exports.getNetwork = function () {
    // Not Working
    return web3.version.getNetwork();
};

exports.createAccount = function () {
    return web3.eth.accounts.create();
};

exports.createAccountThirdParty = function () {
    return account.create();
};

exports.register = function (accountAddress) {
    // Not Working
    return web3.eth.register(accountAddress);
};

exports.createPersonalAccount = function (password) {
    // Not Working
    return web3.personal.newAccount(password);
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

exports.createWallet = function (numberOfAccounts, entropy) {
    return web3.eth.accounts.wallet.create(numberOfAccounts, entropy);
};

exports.sendTransaction = function (data) {
    console.log('data ', data);
    return web3.eth.sendTransaction(data);
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

exports.trialOnly = async function () {
    web3.eth.getAccounts().then(console.log);
};

exports.compileContract = async function (fileSource, contractName) {
    return solc.compile(fileSource, 1).contracts[':' + contractName];
};

exports.deployContract = async function (contractInterface, contractByteCode, address, options) {
    var MyContract = await new web3.eth.Contract(JSON.parse(contractInterface), address, {
        gas: options.gas || '1000000',
        from: address
    });
    return MyContract.deploy({
        data: contractByteCode,
        arguments: ['fg', 'My String']
    });
};
exports.callContractFunction = async function (contractABI, address) {
    var MyContract = await new web3.eth.Contract(contractABI, address);
    return MyContract.methods.get().call();
};