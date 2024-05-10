module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,  // Match the port to your Ganache settings
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
