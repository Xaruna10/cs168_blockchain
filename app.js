
document.addEventListener('DOMContentLoaded', function() {
    // Ensure MetaMask is installed
        const web3 = new Web3("http://127.0.0.1:9545/");
        //const contractJSON = require('./build/contracts/Mycelia.json');
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "genesisOracle",
                "type": "address"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "uint8",
                "name": "parity",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "px",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "e",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
              }
            ],
            "name": "verify",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          }
        ];
        const contractAddress = '0x1f5e5C7bB340943AB2b0fd78eF72581e27d23B01';

        // const contractABI = [
        //     // Existing ABI components from your contract
        //     {
        //         "inputs": [],
        //         "name": "chainId",
        //         "outputs": [
        //             {
        //                 "internalType": "uint256",
        //                 "name": "",
        //                 "type": "uint256"
        //             }
        //         ],
        //         "stateMutability": "view",
        //         "type": "function",
        //         "constant": true
        //     },
        //     {
        //         "inputs": [],
        //         "name": "contractAddress",
        //         "outputs": [
        //             {
        //                 "internalType": "address",
        //                 "name": "",
        //                 "type": "address"
        //             }
        //         ],
        //         "stateMutability": "view",
        //         "type": "function",
        //         "constant": true
        //     },
        //     {
        //         "inputs": [],
        //         "name": "data",
        //         "outputs": [
        //             {
        //                 "internalType": "bytes",
        //                 "name": "",
        //                 "type": "bytes"
        //             }
        //         ],
        //         "stateMutability": "view",
        //         "type": "function",
        //         "constant": true
        //     },
        //     {
        //         "inputs": [],
        //         "name": "response",
        //         "outputs": [
        //             {
        //                 "internalType": "bytes",
        //                 "name": "",
        //                 "type": "bytes"
        //             }
        //         ],
        //         "stateMutability": "view",
        //         "type": "function",
        //         "constant": true
        //     },
        //     {
        //         "inputs": [
        //             {
        //                 "internalType": "uint256",
        //                 "name": "_chainId",
        //                 "type": "uint256"
        //             },
        //             {
        //                 "internalType": "address",
        //                 "name": "_contractAddress",
        //                 "type": "address"
        //             },
        //             {
        //                 "internalType": "bytes",
        //                 "name": "_data",
        //                 "type": "bytes"
        //             },
        //             {
        //                 "internalType": "bytes",
        //                 "name": "_response",
        //                 "type": "bytes"
        //             }
        //         ],
        //         "name": "storeValues",
        //         "outputs": [],
        //         "stateMutability": "nonpayable",
        //         "type": "function"
        //     },
        //     {
        //         "inputs": [],
        //         "name": "getValues",
        //         "outputs": [
        //             {
        //                 "internalType": "uint256",
        //                 "name": "",
        //                 "type": "uint256"
        //             },
        //             {
        //                 "internalType": "address",
        //                 "name": "",
        //                 "type": "address"
        //             },
        //             {
        //                 "internalType": "bytes",
        //                 "name": "",
        //                 "type": "bytes"
        //             },
        //             {
        //                 "internalType": "bytes",
        //                 "name": "",
        //                 "type": "bytes"
        //             }
        //         ],
        //         "stateMutability": "view",
        //         "type": "function",
        //         "constant": true
        //     }
        // ];
        //const contractAddress = '0x17d0D46D7E3fb1351681a3c761F87cB22C8aC4d3';
        const myContract = new web3.eth.Contract(contractABI, contractAddress);

        // Request account access if needed

        document.getElementById('storeButton').addEventListener('click', function() {
            const parity = parseInt(document.getElementById('parity').value);
            const privateKey = document.getElementById('privateKey').value;
            const message = document.getElementById('message').value;
            const s = document.getElementById('s').value;
            const e = document.getElementById('e').value;

            // Execute contract call with the first available account
            web3.eth.getAccounts().then(function(accounts) {
                const defaultAccount = accounts[0];
                console.log(parity);
                console.log(privateKey);
                console.log(e);
                console.log(s);
                console.log(message);
                myContract.methods.verify(parity, privateKey, e, s, message).send({from: defaultAccount})
                .then(function(result) {
                    console.log(result);
                    alert('Storage successful: ' + result.transactionHash);
                }).catch(function(error) {
                    console.error('Error in transaction:', error);
                    alert('Transaction failed');
                });
            });
        });
    
});
