// import ethers from 'ethers';
import { web3 } from "./Web3Helper";
// const ethers = require('ethers');
import { ethers } from "ethers";


const PRIVATEKEY = "12a0f8cc4e537fd0a41f0f58995abaabcef5287066c3045cf3aa875f730c5ae4";

export const createSignature1 = async (data1) => {  
  try {
    const web3connect = await web3();

    const from_account = web3connect.utils.toChecksumAddress(data1.userAddress);

    let blockNo = await web3connect.eth.getBlockNumber();
    let block = await web3connect.eth.getBlock(blockNo);
    let timeStamp = block.timestamp;

    // const EIP712Domain = [
    //   { name: "name", type: "string" },
    //   { name: "version", type: "string" },
    // ];

    let amount = "0x" + (parseFloat((data1.amount * (10 ** 18)).toFixed(0))).toString(16);

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
      userAddress: from_account,
      amount: amount,
      timeStamp: timeStamp,
      brc20Token: data1.brc20Token,
    };


    const signer = new ethers.Wallet(PRIVATEKEY);


    // Sign the typed data message
    const output = await signer._signTypedData(domain, { Permit: Permit }, message);


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
