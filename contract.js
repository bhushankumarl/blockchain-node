var path = require('path');
var fs = require('fs');

var inboxPath = path.resolve(__dirname, './contracts', 'sharing.sol');
var source = fs.readFileSync(inboxPath, 'utf8');

var web3Service = require('./Web3Service');

var execute = async function () {
    try {
        var compileContract = await web3Service.compileContract(source, 'ProductInformation');
        console.log('compileContract', compileContract);
        var options = {
            gas: '1000000'
        };
        var ABI = JSON.parse(compileContract.metadata);
        web3Service.deployContract(compileContract.interface, compileContract.bytecode, '0x99429f64cf4D5837620DcC293C1A537D58729b68', options);
        web3Service.callContractFunction(ABI.output.abi, '0x99429f64cf4D5837620DcC293C1A537D58729b68');
    } catch (Exception) {
        console.log('Exception ', Exception);
    }

};

execute();