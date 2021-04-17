import { task } from "hardhat/config";
import { ethers } from "hardhat";
import "@nomiclabs/hardhat-waffle";

task("accounts", "print the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

let privateKey: string;

try {
  privateKey = require("./secrets.json").privateKey; 
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
  // fake key
  privateKey = '93a52f70106895984eca800e39d914317ac01080383ea5875a4407a7d3a2c11e'
}

const maticTestnetConfig = {
  url: "https://rpc-mumbai.maticvigil.com",
  accounts: [privateKey]
};

export default {
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }, 
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    matic: maticTestnetConfig,
  }
};
