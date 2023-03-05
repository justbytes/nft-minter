const { ethers } = require("hardhat");
const desertSlugsJSON = require("../artifacts/contracts/DesertSlugs.sol/DesertSlugs.json");

async function main() {
  const abi = desertSlugsJSON.abi;
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.ALCHEMY_PRIVATE_KEY
  );
  const wallet = new ethers.Wallet(
    process.env.GOERLI_WALLET_PRIVATE_KEY,
    provider
  );
  const signer = wallet.connect(provider);
  const desertSlugs = new ethers.Contract(
    "0x0970dd6c09B6d303F343A5D815290E0f61c18e9d",
    abi,
    signer
  );
  await desertSlugs.mint(
    "https://ipfs.io/ipfs/QmW7Ku7VAaPm4oSehY8bpkCH4XsfbxMx24oAqov2SPE6c6"
  );
  console.log("NFT minted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
