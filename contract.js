var path = require('path');
var fs = require('fs');

var inboxPath = path.resolve(__dirname, './contracts', 'sharing.sol');
var source = fs.readFileSync(inboxPath, 'utf8');

var web3Service = require('./Web3Service');

var execute = async function () {
    try {
        var isListen = await  web3Service.isListening();
        // console.log('isListen ', isListen);

        // var accounts = await  web3Service.getAccounts();
        // console.log('accounts ', accounts);

        // Address created through web3.eth.personal.newAccount(password);
        var address = '0x17ad813427f68F9E0f103766592C0BAb3d12B795';
        var address = await web3Service.getCoinbase();

        var balance = await  web3Service.getBalance(address);
        console.log('balance ', balance.toString(10));

        var unlockAccount = await  web3Service.unlockAccountPersonalCoinbaseAccount();
        console.log('unlockAccount ', address, unlockAccount);


        var compileContract = await web3Service.compileContract(source);
        // console.log('compileContract ', compileContract);
        const bytecode = compileContract.contracts[':ProductInformation'].bytecode;
        const ABI = JSON.parse(compileContract.contracts[':ProductInformation'].interface);
        // console.log('bytecode ', bytecode);
        // console.log('ABI ', ABI);


        var deployedContract = await web3Service.sendResponse(ABI, bytecode, address, {});
        // console.log('deployedContracts ', deployedContract);
        // web3Service.callContractFunction(ABI, address);
    } catch (Exception) {
        console.log('Exception ', Exception);
    }
};

execute();