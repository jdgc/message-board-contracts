import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

task("accounts", "print the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address) ;
  }
})

export default {
  solidity: "0.7.6",
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
