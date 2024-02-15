import Web3 from "web3";
import { web3 } from "../Web3Helper";
const ethers = require('ethers')
import { toast } from "react-toastify";


const PRIVATEKEY = ""

export const createSignature1 = async (data1) => {  
  try {
    const web3connect = await web3();

    const accounts = await web3connect.eth.getAccounts();

    let selectedAccount = accounts[0];

    const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

    let blockNo = await web3connect.eth.getBlockNumber();
    let block = await web3connect.eth.getBlock(blockNo);
    let timeStamp = block.timestamp;

    const EIP712Domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
    ];
    const domain = {
      name: "BRC20",
      version: "1",
    };
    const Permit = [
      { name: "userAddress", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "timeStamp", type: "uint256" },
      { name: "brc20Token", type: "address" },
    ];
    const message = {
      userAddress: data1._userAddress,
      amount: data1._amount,
      timeStamp: timeStamp,
      brc20Token: data1._brc20Token,
    };

    console.log("voucher", message);

    const signer = new ethers.Wallet(PRIVATEKEY);

    console.log("signer", signer);

    // Sign the typed data message
    const output = await signer.signTypedData(domain, { Permit: Permit }, message);
    console.log("output", output);


    if (output) {
      const signatures = output.substring(2);
      const r = "0x" + signatures.substring(0, 64);
      const s = "0x" + signatures.substring(64, 128);
      const v = parseInt(signatures.substring(128, 130), 16);
      const signature = "0x" + signatures;

      return {
        signature,
        r,
        v,
        s,
        timeStamp,
        blockNo,
        voucher: message
      }
    } else {
      return false
    }
  } catch (error) {
    console.log(error);
    throw error
  }
};
