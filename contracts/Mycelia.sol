// SPDX-License-Identifier: LGPLv3
pragma solidity ^0.8.0;

import {Schnorr} from "./Schnorr.sol";

contract Mycelia {
    error InvalidRequest();
    error InvalidSignature();

    address oracle;

    constructor(address genesisOracle) {
        oracle = genesisOracle;
    }

    function verify(
        uint256 chainId,
        address _contract,
        bytes calldata data,
        bytes calldata response
    ) public view returns (bytes memory) {
        bytes32 request = keccak256(abi.encode(chainId, _contract, data, response));
        
        Schnorr.SchnorrSignature memory sig = Schnorr.SchnorrSignature({
            parity: 28,
            px: 0x40822101b62ed3ad321fe7c140fea79ee90f43c392f04b3784e7ff9c644ffed4,
            message: 0xb76929c381d1ca8b5ea69d4f69ef61d234effc844481959ff5cd23eff9277df5,
            e: 0xa2fdcd6f4de6028a6510e92ad651c6aec2bd9cd4bc894e3bb4438407c8c9184b,
            s: 0x5debd610848954b9da43b3b6b3b37c680a8979281206687eef403f0b5f857f4d
        });
        
        address signer = Schnorr.recover(sig);

        if (signer != oracle) revert InvalidSignature();

        return response;
    }
}
