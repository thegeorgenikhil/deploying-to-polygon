const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://rpc-mumbai.maticvigil.com`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  api_keys: {
    polygonscan: process.env.POLYGONSCAN_KEY,
  },
  plugins: ["truffle-plugin-verify"],

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
