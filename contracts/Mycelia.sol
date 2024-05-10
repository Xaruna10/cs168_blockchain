// SPDX-License-Identifier: LGPLv3
pragma solidity ^0.8.0;

import {Schnorr} from "./Schnorr.sol";

contract Mycelia {
    address oracle;

    constructor(address genesisOracle) {
        oracle = genesisOracle;
    }

    function verify(
        uint8 parity,
        bytes32 px,
        bytes32 e,
        bytes32 s,
        bytes32 message
    ) public view returns (bool) {
        Schnorr.SchnorrSignature memory sig = Schnorr.SchnorrSignature({
            parity: parity,
            px: px,
            e: e,
            s: s,
            message: message
        });

        address signer = Schnorr.recover(sig);

        // Return true if the signer matches the oracle, else false
        return signer == oracle;
    }
}
