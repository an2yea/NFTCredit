const CONTRACT_ADDRESS = "0x6164BCFCE34bB42475ef4375c5Aa1B8e122F66e1"
const META_DATA_URL = "ipfs://bafyreidrt5utdvnwonctnojcese7n2lzi4pkcvvtz7mw2ptijbtnb5sfya/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT("0xd397c7C9dE1f32A3Be31f7EEC9e492504b9dD31D", metaDataURL, {
      //    // value signifies the cost of one crypto dev which is "0.01" eth.
      //    // We are parsing `0.01` string to ether using the utils library from ethers.js
         value: ethers.utils.parseEther("0.001"),
       })
   //  await ExampleNFT.attach(contractAddress).withdraw();
   console.log("NFT minted to", "0xd397c7C9dE1f32A3Be31f7EEC9e492504b9dD31D")
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });