const CONTRACT_ADDRESS = "0x2976A1EbA13a6f86103fD1E62C6e1628c8A2064e"
const META_DATA_URL = "ipfs://bafyreidrt5utdvnwonctnojcese7n2lzi4pkcvvtz7mw2ptijbtnb5sfya/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("UsdcNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT("0x06112429a07846222038aaCe3e91B0140460681B", metaDataURL)
    // await ExampleNFT.attach(contractAddress).withdraw();
   // await ExampleNFT.attach("0x0FA8781a83E46826621b3BC094Ea2A0212e71B23").approve(CONTRACT_ADDRESS, 50000)
   let bal = await ExampleNFT.attach("0x0FA8781a83E46826621b3BC094Ea2A0212e71B23").balanceOf('0xd397c7C9dE1f32A3Be31f7EEC9e492504b9dD31D');
   console.log('Bal is', bal.toNumber());
   console.log("NFT minted to", "0x06112429a07846222038aaCe3e91B0140460681B")
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });