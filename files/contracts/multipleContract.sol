pragma solidity ^0.4.17;

contract ProductInformation {

        struct Information{
            string sharer;
        }

        Information public product;

        function setInformation(string value1) public {
            Information memory info = Information(value1);
            product = info;
        }

        function test(address) {
            ProductInformationPermission pr =ProductInformationPermission(msg.sender);
            pr.setPermission('admin', 'create product');
            pr.getPermissionByRole();
            pr.rolePermission;
        }
        /*function setPermission(string value1,string value2) public {

        }*/

        function getInformation() constant returns (string) {
            return product.sharer;
        }
}

contract ProductInformationPermission {

        struct Role{
            string role;
            string permission;
        }

        Role public rolePermission;

        function setPermission(string value1,string value2) public {
            Role memory data = Role(value1,value2);
            rolePermission = data;
        }

        function getPermissionByRole()constant returns (string,string) {
            return (rolePermission.role,rolePermission.permission);
        }
}


