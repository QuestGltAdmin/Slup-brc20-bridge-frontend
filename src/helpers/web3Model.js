import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import {
  configureChains,
  createConfig,
  getAccount,
  getNetwork,
  switchNetwork,
} from "@wagmi/core";
import {
  mainnet,
  polygon,
  bsc,
  bscTestnet,
  polygonMumbai,
  sepolia,
} from "@wagmi/core/chains";
import { toast } from "react-toastify";

export const web3Modal = async () => {
  const projectId = "ed2cd5a80c594edfcd61d7a2accc7302";
  const chains = [bsc, mainnet, polygon, bscTestnet, polygonMumbai, sepolia];

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 2, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  const web3Modal = new Web3Modal({ projectId }, ethereumClient);
  return web3Modal;
};

export const OpenModal = async () => {
  let _web3Modal = await web3Modal();
  await _web3Modal.openModal();
};

export const getAccountDetail = async () => {
  let account = getAccount();
  let network = getNetwork();
  if (account.address) {
    return {
      selectedAccount: account.address,
      chainId: network.chain.id,
      type: "walletConnect",
    };
  }
  return false;
};

export const getNetworkDetail = async () => {
  let account = getAccount();
  let network = getNetwork();
  if (account.address) {
    return network;
  }
  return false;
};

export const _switchNetwork = async (ChainId) => {
  const id = toast.loading("Please Check Your Wallet");
  try {
    await switchNetwork({
      chainId: ChainId,
    });
    toast.update(id, {
      render: "You have successfully switched to Binance network",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return true;
  } catch (error) {
    toast.update(id, {
      render: "Failed to switch to the network",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
    return false;
  }
};
