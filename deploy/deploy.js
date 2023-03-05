const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const DesertSlugs = await ethers.getContractFactory("DesertSlugs");
  const desertSlugs = await DesertSlugs.deploy("DesertSlugs", "DSS");

  try {
    await desertSlugs.deployed();
    console.log(`Slugs deployed to ${desertSlugs.address}`);
    mintNft();
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }

  async function mintNft() {
    try {
      const newItemId = await desertSlugs.mint(
        "https://ipfs.io/ipfs/QmbFtWpQLbH5U9XRLURDB8kK5363JHSF4UkaCsPKsjzoXn"
      );
      console.log(`NFT minted successfully`);
    } catch (err) {
      console.log(`Minting Error: ${err.message}`);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
