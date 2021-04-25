import { ethers } from 'hardhat';

async function main() {
  const Board = await ethers.getContractFactory("Board");
  const board = await Board.deploy();

  console.log("Board contract deployed to:", board.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
