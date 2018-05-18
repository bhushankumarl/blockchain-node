pragma solidity ^0.4.17;

contract ProductInformation {

        struct Information{
            string sharer;
        }

        struct transfer{
            ProductInformationPermission pip;
        }

        mapping(uint => transfer) transfers;
        uint numTransfers;

        Information public product;

        function setInformation(string value1) public {


            ProductInformationPermission m =new ProductInformationPermission();
            m.getPermissionData();

            Information memory info = Information(value1);
            product = info;

        }

        function getData() constant returns (string) {

        return "This is value from the contract : 123456789";

        }

        function getInformation() constant returns (string) {

        return product.sharer;

        }

}

contract ProductInformationPermission {
        mapping (address => uint) public balances;

        function ProductInformationPermission() {
            balances[msg.sender] = 10000;
            }
            function getPermissionData() constant returns (string) {
            return "This is value from another contract : hhhhhhhh";
        }

}