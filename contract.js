var path = require('path');
var fs = require('fs');

var inboxPath = path.resolve(__dirname, './contracts', 'sharing.sol');
var source = fs.readFileSync(inboxPath, 'utf8');

var web3Service = require('./Web3Service');

var execute = async function () {
    try {
        var isListen = await  web3Service.isListening();
        // console.log('isListen ', isListen);

        var accounts = await  web3Service.getAccounts();
        // console.log('accounts ', accounts);
        var address = '0x17ad813427f68F9E0f103766592C0BAb3d12B795';

        var unlockAccount = await  web3Service.unlockAccountPersonalAccount(address, '123456789');
        console.log('unlockAccount ', address, unlockAccount);

        var compileContract = await web3Service.compileContract(source);
        // console.log('compileContract ', compileContract);
        const bytecode = compileContract.contracts[':ProductInformation'].bytecode;
        const ABI = JSON.parse(compileContract.contracts[':ProductInformation'].interface);
        // console.log('bytecode ', bytecode);
        // console.log('ABI ', ABI);
        // console.log('compileContract', compileContract);


        var options = {
            gas: '10000000'
        };
        var deployedContract = await web3Service.deployContract(ABI, bytecode, address, options);

        // web3Service.callContractFunction(ABI, address);
    } catch (Exception) {
        console.log('Exception ', Exception);
    }
};

execute();