import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { Context } from "@/pages/Context";
import { useContext } from "react";

export const mintNFT = async({toAddress, }) => {
    try{
      const [loading, setLoading] = useContext(Context);
      setLoading(true);
      const relay = new GelatoRelay();
      let iface = new ethers.utils.Interface(CONTRACT_ABI);
      let tokenURI = "ipfs://bafyreidrt5utdvnwonctnojcese7n2lzi4pkcvvtz7mw2ptijbtnb5sfya/metadata.json"
      let recipient = toAddress;
      console.log(recipient, tokenURI);
      
      let tx = iface.encodeFunctionData("mintNFT", [ recipient, tokenURI ])
      
      console.log(tx)
      console.log(gw);
      const temp = await gw.sponsorTransaction(
        CONTRACT_ADDRESS,
        tx,
        ethers.utils.parseEther("0.001")
      );
      console.log(temp)
      setTaskId(temp.taskId, console.log(taskId));
      setLoading(false);
      return <> Task Id : {taskId}</>      
    } catch (error) {
      console.log(error)
    }
  }