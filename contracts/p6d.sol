// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/** 
 * @title p6d
 * @dev Implements storage registry for decentralized password manager
 */
contract p6d is Ownable {

    mapping(address => string) accountToVaultPtr;
    uint public serviceFee;

    function getVaultPtr(address _addr) public view returns (string memory) {
        return accountToVaultPtr[_addr];
    }

    function updateVaultPtr(string calldata _vaultPtr) public payable {
        require(msg.value >= serviceFee, "Service fee must be provided.");
        accountToVaultPtr[msg.sender] = _vaultPtr;
    }

    function withdrawBalance() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Failed to withdraw balance.");
    }

    function updateServiceFee(uint _amount) public onlyOwner {
        serviceFee = _amount;
    }
}