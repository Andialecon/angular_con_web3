import { User } from "src/app/interfaces/Users";
import { ethers } from "ethers";

export const handleSignature = async (user:User, eth:any) => {
  try {
    const provider = new ethers.providers.Web3Provider(eth);
    
    const signed = provider.getSigner();
    
    const signature = await signed.signMessage(
      `you are logining in Cryptomillionaire with this nonce: ${user.nonce}`
    );

    return signature;

  } catch (error) {
    throw error;
  }
};



