// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Mycelia.sol";
import "truffle/console.sol";

contract SimpleStorage {
    uint256 public chainId;
    address public contractAddress;
    bytes public data;
    bytes public response;

    Mycelia public mycelia;

     constructor(address myceliaAddress) {
        mycelia = Mycelia(myceliaAddress);
    }

    function storeValues(uint256 _chainId, address _contractAddress, bytes memory _data, bytes memory _response) 
    public returns (uint256, address, bytes memory, bytes memory, bytes memory) {
        chainId = _chainId;
        contractAddress = _contractAddress;
        data = _data;
        response = _response;

        bytes memory verifiedResponse = mycelia.verify(_chainId, _contractAddress, _data, _response);
        return (chainId, contractAddress, data, response, verifiedResponse);
    }

    function getValues() public view returns (uint256, address, bytes memory, bytes memory) {
        return (chainId, contractAddress, data, response);
    }
}
