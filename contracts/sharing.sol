pragma solidity ^0.4.18;

contract ProductInformation {

    function get() public constant returns (string) {
        return '123456789';
    }

    function getData() constant returns (string) {
        return "123456789";
    }

}