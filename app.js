var web3Service = require('./Web3Service');

var execute = async function () {
    try {
        var isListen = await  web3Service.isListening();
        console.log('isListen ', isListen);

        var version = await  web3Service.getVersion();
        console.log('version ', version);

        var personalAccount = await  web3Service.createPersonalAccount('123456789');
        console.log('personalAccount ', personalAccount);

        /*var network = await  web3Service.getNetwork();
        console.log('network ', network);*/

        var newAccount = await  web3Service.createAccount();
        console.log('newAccount ', newAccount);

        var encyptedAccount = await  web3Service.encyptAccount(newAccount.privateKey, '123456789');
        console.log('encyptedAccount ', encyptedAccount);

        /*var newAccountThirdParty = await  web3Service.createAccountThirdParty();
        console.log('newAccountThirdParty ', newAccountThirdParty);*/

        var balance = await  web3Service.getBalance(newAccount.address);
        console.log('balance ', balance.toString(10));

        var gasPrice = await  web3Service.getGasPrice();
        console.log('gasPrice ', gasPrice);

        var storage = await  web3Service.getStorageAt(newAccount.address);
        console.log('storage ', storage);

        var currentBlock = await  web3Service.getBlockNumber();
        console.log('currentBlock ', currentBlock);

        var syncing = await  web3Service.isSyncing();
        console.log('syncing ', syncing);

        /*var defaultAccount = await  web3Service.defaultAccount();
        console.log('defaultAccount ', defaultAccount);*/

        var accounts = await  web3Service.getAccounts();
        console.log('accounts ', accounts);
        console.log('total accounts ', accounts.length);

        /*var accounts = await  web3Service.trialOnly();
        console.log('accounts ', accounts);*/

        /*var clientAddress = await  web3Service.getCoinbase();
        console.log('clientAddress ', clientAddress);*/
    } catch (Exception) {
        console.log('Exception ', Exception);
    }

};

execute();