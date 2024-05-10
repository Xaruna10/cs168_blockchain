// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Mycelia.sol";
import "truffle/console.sol";

contract SimpleStorage {
    Mycelia public mycelia;

    constructor(address myceliaAddress) {
        mycelia = Mycelia(myceliaAddress);
    }

    function verifySig(
        uint8 parity,
        bytes32 px,
        bytes32 e,
        bytes32 s,
        bytes32 message
    ) public view returns (bool) {
        // Call the updated verify function and return the result
        return mycelia.verify(parity, px, e, s, message);
    }
}
