import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });

   //ipfs://bafyreigegpdb5z4w7lgxeez7to4fcpio5ioejcsfezzegxlyw3lvh7ocla/metadata.json
   //ipfs://bafyreidrt5utdvnwonctnojcese7n2lzi4pkcvvtz7mw2ptijbtnb5sfya/metadata.json