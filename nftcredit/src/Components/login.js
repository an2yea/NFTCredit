import { Context } from "@/pages/Context";
import { useContext } from "react";
import { GaslessOnboarding} from "@gelatonetwork/gasless-onboarding"

export async function Login() {
    try{
      const {setLoading, setGOBMethod, setGW, setTokens} = useContext(Context);
      setLoading(true);
      const gaslessWalletConfig = { apiKey: process.env.NEXT_PUBLIC_GASLESSWALLET_KEY};
      const loginConfig = {
        domains: ["http://localhost:3000/"],
        chain : {
          id: 80001,
          rpcUrl: "https://wiser-alien-morning.matic-testnet.discover.quiknode.pro/c2f6cfc05517853e094ad7ea47188326625f20b5/",
        },
        openLogin: {
          redirectUrl: `http://localhost:3000/`,
        },
      };
      const gaslessOnboarding = new GaslessOnboarding(
        loginConfig,
        gaslessWalletConfig
      );
      
      await gaslessOnboarding.init();
      const web3AP = await gaslessOnboarding.login();
      setWeb3AuthProvider(web3AP);
      setLoading(false);
      console.log("Web3 Auth Provider", web3AP);
      setGOBMethod(gaslessOnboarding);

      const gaslessWallet = gaslessOnboarding.getGaslessWallet();
      setGW(gaslessWallet);
      console.log("Wallet is", gaslessWallet)

      const address = gaslessWallet.getAddress();
      setWalletAddress(address);

      const result = await fetch(`https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_APIKEY}`);
      const balance = await result.json();
      setTokens(balance.data.items);
    } catch (err){
      console.error(err);
    }
  }