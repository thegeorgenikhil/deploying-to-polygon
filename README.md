# Deploying to Polygon

This is a guide to deploying to Polygon. We are deploying to polygon using 3 Ethereum Development Tools

- Brownie
- Hardhat
- Truffle

### Points to note

- For verifying the contract get the API keys from [https://polygonscan.com/](https://polygonscan.com/)
- Before deploying add in some MATIC in your metamask token from [https://faucet.polygon.technology/](https://faucet.polygon.technology/)

## 1. Deploying to Polygon using Brownie

Note: By default brownie uses infura’s endpoint to deploy to polygon but to add polygon endpoint to your infura account you need to provide your card details. So we will switch infura with alchemy.

### Add Polygon Network Configuration

- Change the provider for polygon-test from infura to alchemy

```
brownie networks modify polygon-test provider=alchemy
```

- Add in the polygon mumbai endpoint to the networks

```
brownie networks modify polygon-test host="https://polygon-mumbai.g.alchemy.com/v2/\$WEB3_ALCHEMY_PROJECT_ID"
```

### Deploying to Polygon

- Create a `brownie-config.yaml` file and add this

```
dotenv: .env
```

- Add in the variable in a `.env` file

```
WEB3_ALCHEMY_PROJECT_ID=<alchemy-project-id>
POLYGONSCAN_TOKEN=<api-key-from-polygonscan>
```

- Run the deploy script

Note: for verification set publish_source=True when writing the scripts/deploy.py file.

```bash
brownie run scripts/deploy.py  --network polygon-test
```

## 2. Deploying to Polygon using Hardhat

### Add Polygon Network Configuration to hardhat.config.js

- Add in the variable in your .env file

```
PRIVATE_KEY=<private-key-here>
POLYGONSCAN_KEY=<api-key-from-polygonscan>
```

- Add in the polygon mumbai network configuration in the module.exports.networks

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_KEY,
  },
  solidity: "0.8.17",
};
```

### Deploying to Polygon

- Run the deploy script

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

### Verifying the contract on PolygonScan

- Create a `argument.js` file and add this

```js
module.exports = ["arg1", "arg2",...];
```

```
npx hardhat verify --network polygon_mumbai <contract-address> --constructor-args argument.js
```

## 3. Deploying to Polygon using Truffle

Guide - [Truffle Polygon](https://wiki.polygon.technology/docs/develop/truffle/)
