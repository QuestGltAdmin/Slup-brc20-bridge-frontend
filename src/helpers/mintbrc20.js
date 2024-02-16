import { web3, _switch } from "./Web3Helper";
import { toast } from "react-toastify";
import LockingABI from "../ABI/BRCLocking.json";
import { getAccountDetail, getNetworkDetail } from "./web3Model";
import Web3 from "web3";
import { sendTransaction } from "@wagmi/core";


export const MintBrc20 = async (data) => {

    
    let address = "0x2ebb0982cA671A61a57807988392e1A19F6b310a";
    const abi = LockingABI;

    if (data.type === "walletConnect") {''
        let network = await getNetworkDetail();
        let web3connect = new Web3(
            new Web3.providers.HttpProvider(network.chain.rpcUrls.default.http[0])
        );

        const accounts = await getAccountDetail();
        let selectedAccount = accounts.selectedAccount;
        const chainId = accounts.chainId;

        const caddress = web3connect.utils.toChecksumAddress(address);

        let lockingBRC20Contract = new web3connect.eth.Contract(abi, caddress);
        let  userDetails= [data.userAddress,data.Amount,data.timeStamp,data.brcToken];
        let Data = lockingBRC20Contract.methods
            .mintBrc20(data.v,data.r,data.s,userDetails)
            .encodeABI();

        const nonce = await web3connect.eth.getTransactionCount(
            selectedAccount,
            "latest"
        ); //get latest nonce

        if (chainId !== data.chainId) {
            toast.warn("Wrong Network");
            // _switch();
            return false;
        }

        const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

        let tx;
        try {
            let estimates_gas = await web3connect.eth.estimateGas({
                from: from_account,
                to: caddress,
                data: Data,
            });

            let gasLimit = web3connect.utils.toHex(estimates_gas * 2);
            let gasPrice_bal = await web3connect.eth.getGasPrice();
            let gasPrice = web3connect.utils.toHex(gasPrice_bal);

            tx = {
                from: from_account,
                to: caddress,
                nonce: nonce,
                gasPrice: gasPrice,
                gasLimit: gasLimit,
                data: Data,
            };

            let hash = await sendTransaction(tx);
            const ids = toast.loading(
                "Please Check your Metamask for any Pending Transaction"
            );
            // toast.success('Wait For transaction to Success')
            // show modal
            const expectedBlockTime = 1000; // 1sec
            const sleep = (milliseconds) => {
                return new Promise((resolve) => setTimeout(resolve, milliseconds));
            };
            let transactionReceipt = null;
            while (transactionReceipt == null) {
                // Waiting expectedBlockTime until the transaction is mined
                transactionReceipt = await web3connect.eth.getTransactionReceipt(
                    hash.hash
                );
                await sleep(expectedBlockTime);
            }

            if (transactionReceipt.status) {
                toast.update(ids, {
                    render: "Transaction Success",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
                return transactionReceipt;
            } else {
                toast.update(ids, {
                    render: "Transaction Reverted",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
                window.location.reload();
            }
        } catch (error) {
            toast.error("Transaction Reverted");
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            console.log(error);
            throw error;
        }
    } else {
        try {
            const web3connect = await web3(data.type);

            const accounts = await web3connect.eth.getAccounts();

            let selectedAccount = accounts[0];
            const caddress = web3connect.utils.toChecksumAddress(address);

            let lockingBRC20Contract = new web3connect.eth.Contract(abi, caddress);

            let  userDetails= [data.userAddress,data.Amount,data.timeStamp,data.brcToken];
        let Data = lockingBRC20Contract.methods
            .mintBrc20(data.v,data.r,data.s,userDetails)
            .encodeABI();

            const nonce = await web3connect.eth.getTransactionCount(
                selectedAccount,
                "latest"
            ); //get latest nonce

            const chainId = await web3connect.eth.getChainId();

            if (chainId !== data.chainId) {
                toast.warn("Wrong Network");
                // _switch();
                return false;
            }

            const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

            let tx;
            let estimates_gas = await web3connect.eth.estimateGas({
                from: from_account,
                to: caddress,
                data: Data,
            });

            let gasLimit = web3connect.utils.toHex(estimates_gas * 2);
            let gasPrice_bal = await web3connect.eth.getGasPrice();
            let gasPrice = web3connect.utils.toHex(gasPrice_bal);

            tx = {
                from: from_account,
                to: caddress,
                nonce: nonce,
                gasPrice: gasPrice,
                gasLimit: gasLimit,
                data: Data,
            };

            let recipt;

            await web3connect.eth.sendTransaction(tx, function (err, hash) {
                if (!err) {
                    const ids = toast.loading(
                        "Please Check your Metamask for any Pending Transaction"
                    );
                    // toast.success('Please Wait Till Your Transaction is Success')
                    const expectedBlockTime = 1000; // 1sec

                    const sleep = (milliseconds) => {
                        return new Promise((resolve) => setTimeout(resolve, milliseconds));
                    };
                    (async function () {
                        let transactionReceipt = null;
                        while (transactionReceipt == null) {
                            // Waiting expectedBlockTime until the transaction is mined
                            transactionReceipt = await web3connect.eth.getTransactionReceipt(
                                hash
                            );
                            recipt = transactionReceipt;
                            await sleep(expectedBlockTime);
                        }
                        if (transactionReceipt.status) {
                            toast.update(ids, {
                                render: "Transaction Success",
                                type: "success",
                                isLoading: false,
                                autoClose: 1000,
                            });
                            recipt = transactionReceipt;
                            return true;
                            // toast.success('Transaction Success')
                        } else {
                            toast.update(ids, {
                                render: "Transaction Reverted",
                                type: "error",
                                isLoading: false,
                                autoClose: 2000,
                            });
                            // toast.error('Transaction Reverted');
                            window.location.reload();
                        }
                    })();
                } else {
                    toast.error("Transaction Reverted");
                    window.location.reload();
                }
            });
            return recipt;
        } catch (error) {
            toast.error("Transaction Reverted");
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            console.log(error);
        }
    }
};