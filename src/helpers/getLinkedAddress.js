import Web3 from "web3";
import LockingABI from "../ABI/BRCLocking.json";

export const getBtcAddress = async (data) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider( 
      "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
    )
  );
  const userSlupAddress = web3.utils.toChecksumAddress(data.userSlupAddress);
  const lockingBRC20Contract = "0x2ebb0982cA671A61a57807988392e1A19F6b310a";
  const abi = LockingABI;

  const contract = new web3.eth.Contract(abi, lockingBRC20Contract);
  let BtcAddress = await contract.methods.getBTCAddress(userSlupAddress).call();

  return BtcAddress;
};

export const getSlupAddress = async (data) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
      )
    );
    const lockingBRC20Contract = "0x2ebb0982cA671A61a57807988392e1A19F6b310a";
    const abi = LockingABI;
  
    const contract = new web3.eth.Contract(ab, lockingBRC20Contract);
    let slupAddress = await contract.methods.getEVMWalletAddress(data.userBtcAddress,data.nativeSegwit,data.nestedSegwit,data.taproot,data.legacy).call();
  
    return slupAddress;
  };