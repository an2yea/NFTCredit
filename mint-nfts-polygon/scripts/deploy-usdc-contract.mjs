async function deployContract() {
    const ExampleNFT = await ethers.getContractFactory("UsdcNFT")
    const exampleNFT = await ExampleNFT.deploy('0x0FA8781a83E46826621b3BC094Ea2A0212e71B23')
    await exampleNFT.deployed()
    // This solves the bug in Mumbai network where the contract address is not the real one
    const txHash = exampleNFT.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
   }
   
   deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

    //0x231A0aeb82E83e317A1aAA3567dF3a93A698eC9D