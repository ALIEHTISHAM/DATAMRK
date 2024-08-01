import { ethers } from 'ethers';

export const connectMetaMask = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log('MetaMask connected:', address);
    return address;
  } else {
    throw new Error('MetaMask not found');
  }
};
