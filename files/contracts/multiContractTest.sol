pragma solidity ^0.4.17;

contract metaCoin {

        function getData() returns (string) {
        return "This is value from the contract : 123456789";
        }
}

contract coinCaller{

        function sendCoin()constant returns(string){
        metaCoin m = metaCoin(0xa2BAe2ECFDf6a20Cd85D028d5e925F7fE29308b6);
        return m.getData();
        }
}

