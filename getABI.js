const fs = require('fs');
const path = require('path');

const abiPath = path.join(__dirname, 'build/contracts/SimpleStorage.json');
const contractJsonContent = fs.readFileSync(abiPath, 'utf8');
const contractJson = JSON.parse(contractJsonContent);

const abi = contractJson.abi;
console.log(JSON.stringify(abi, null, 2)); // Outputs the ABI in a readable format
