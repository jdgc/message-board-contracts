import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

task("accounts", "print the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

const { privateKey } = require("./secrets.json");

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
