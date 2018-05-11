pragma solidity ^0.4.17;

contract ProductInformation {

    function getData() constant returns (string) {
        return "This is value from the contract : 123456789";
    }

}