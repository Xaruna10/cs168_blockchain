// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public chainId;
    address public contractAddress;
    bytes public data;
    bytes public response;

    function storeValues(uint256 _chainId, address _contractAddress, bytes memory _data, bytes memory _response) public {
        chainId = _chainId;
        contractAddress = _contractAddress;
        data = _data;
        response = _response;
    }

    function getValues() public view returns (uint256, address, bytes memory, bytes memory) {
        return (chainId, contractAddress, data, response);
    }
}
