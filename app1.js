
const contractABI = [
    // Existing ABI components from your contract
    {
        "inputs": [],
        "name": "chainId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "contractAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "data",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "response",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_chainId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_contractAddress",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "_response",
                "type": "bytes"
            }
        ],
        "name": "storeValues",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getValues",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];
const contractAddress = '0x17d0D46D7E3fb1351681a3c761F87cB22C8aC4d3';  // Ensure this is the correct contract address

async function loadWeb3() {
//    if (window.ethereum) {
        const web3 = new Web3("http://127.0.0.1:9545/");
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return web3;
        } catch (error) {
            console.error("User denied account access or an error occurred:", error);
            alert('Please enable access to MetaMask.');
        }
    // } else {
    //     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    //     alert('Non-Ethereum browser detected. Please install MetaMask to use this application.');
    //     return null;
    // }
}

async function storeValues() {
    const web3 = await loadWeb3();
    if (!web3) {
        return; // Web3 is not initialized properly
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const chainId = parseInt(document.getElementById('chainId').value);
    const contractAddr = document.getElementById('contractAddress').value;
    const data = web3.utils.asciiToHex(document.getElementById('data').value);
    const response = web3.utils.asciiToHex(document.getElementById('response').value);

    try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            alert("No accounts found. Make sure Ethereum client is configured correctly.");
            return;
        }
        console.log('Attempting to store data using account:', accounts[0]);
        await contract.methods.storeValues(chainId, contractAddr, data, response).send({ from: accounts[0] });
        alert("Data stored successfully!");
    } catch (error) {
        console.error('Error storing data:', error);
        alert("Failed to store data. See console for more details.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const storeButton = document.getElementById('storeButton'); // Ensure your HTML has an element with id="storeButton"
    if (storeButton) {
        storeButton.addEventListener('click', storeValues);
    } else {
        console.log('storeButton not found. Make sure your HTML is set up correctly.');
    }
});
