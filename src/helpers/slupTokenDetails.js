import Web3 from "web3";
import BRC20TokenABI from "../ABI/SlupBrcTokenAbi.json";
// import { web3 } from "./Web3Helper";



export const SlupTokenBalance = async (data) => {

  const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.bnbchain.org:8545"));
  const tokenAddress = web3connect.utils.toChecksumAddress(data.tokenAddress);
  const userAddress = web3connect.utils.toChecksumAddress(data.userAddress);
  const abi = BRC20TokenABI;

  let balance = 0;
  const contract = new web3.eth.Contract(
     abi,
    tokenAddress
  );
  balance = await contract.methods
    .balanceOf(userAddress)
    .call();
  const decimal = await contract.methods.decimals().call();
  balance = balance / (10 ** decimal);

  return balance;
};


export const slupTokenSupply = async (data) => {

  const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.bnbchain.org:8545"));
  const tokenAddress = web3connect.utils.toChecksumAddress(data.tokenAddress);
  const abi = BRC20TokenABI;

  let totalSupply = 0;
  const contract = new web3.eth.Contract(
    abi,
    tokenAddress
  );
  
  totalSupply = await contract.methods.totalSupply().call();
  const decimal = await contract.methods.decimals().call();
  totalSupply = totalSupply / (10 ** decimal);

  return totalSupply;
};
