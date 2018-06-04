var path = require('path');
var fs = require('fs');

var contractPath = path.resolve(__dirname, '..', 'files', 'contracts', 'simple.sol');
var source = fs.readFileSync(contractPath, 'utf8');

var web3Service = require('../Web3Service');

var execute = async function () {
    try {
        var isListen = await  web3Service.isListening();
        // console.log('isListen ', isListen);

        // var accounts = await  web3Service.getAccounts();
        // console.log('accounts ', accounts);

        // Address created through web3.eth.personal.newAccount(password);
        var accountAdress = '0x17ad813427f68F9E0f103766592C0BAb3d12B795';
        var accountAdress = await web3Service.getCoinbase();

        var balance = await  web3Service.getBalance(accountAdress);
        console.log('balance ', balance.toString(10));

       /* var latestBlock = await web3Service.getBlock('latest');
        console.log('latest Block ', latestBlock);*/

        var unlockAccount = await  web3Service.unlockAccountPersonalCoinbaseAccount();
        console.log('unlockAccount ', accountAdress, unlockAccount);


        var compileContract = await web3Service.compileContract(source);
        // console.log('compileContract ', compileContract);
        const bytecode = compileContract.contracts[':SimpleInformation'].bytecode;
        const ABI = JSON.parse(compileContract.contracts[':SimpleInformation'].interface);
        // console.log('bytecode ', bytecode);
        // console.log('ABI ', ABI);


        var transactionHash = await web3Service.deployContract(ABI, bytecode, accountAdress, {});
        var receipt = await web3Service.waitBlockToBeMine(transactionHash);
        console.log('receipt ', receipt);
        // var data = await web3Service.getData(ABI, receipt.contractAddress, {});
        var data = await web3Service.getMultiContractData(ABI, receipt.contractAddress, accountAdress, {});
        console.log('data ', data);
    } catch (Exception) {
        console.log('Exception ', Exception);
    }
};

execute();