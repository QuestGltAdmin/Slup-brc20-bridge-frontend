import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Layout from "../Component/Layout";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  Modal,
  Button,
  InputGroup,
} from "react-bootstrap";
import Tokens from "../JSON/TokenList.json";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import ConnectWalletModal from "../Component/ui/ConnectWalletModal";
import {
  inscribeTransfer,
  transferInscription,
} from "../btcHelper/transferBrc20";
import { toast } from "react-toastify";
import {
  setEVMWallet,
  setUnisatInscription,
  setUnisatSign,
} from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import axiosMain from "../http/axios/axios_main";
import { createSignature1 } from "../helpers/signatureHelper";
import { TransactionConfirmCheck } from "../helpers/TrxConfirmCheck";
import CheckWallet from "../helpers/checkWalletHelper";
import { MintBrc20 } from "../helpers/mintbrc20";
import { BurnBrc20 } from "../helpers/burnbrc20";
import { Connect } from "../helpers/Connect";
import { SlupTokenBalance, slupTokenSupply } from "../helpers/slupTokenDetails";
import { encryptData } from "../helpers/encryption";
import axiosBack from "../http/axios/axios_Back";
import { useNavigate } from "react-router-dom";
import { transferBtc } from "../btcHelper/sendBtc";
import { getBtcAddress, getSlupAddress } from "../helpers/getLinkedAddress";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export const Homepage = () => {
  //===============================Global Variables==================================//
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { WalletBTC, WalletEVM, uniIns, uniSign } = useAuth();
  //===============================End Of Code==================================//

  //===============================Local Variables==================================//
  const [show1, setShow1] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tokenBalanceBTC, setTokenBalanceBTC] = useState(0);
  const [tokenBalanceSLUP, setTokenBalanceSLUP] = useState(0);
  const [from, setFrom] = useState("Bitcoin");
  const [to, setTo] = useState("Slup");
  const [token, setToken] = useState({
    address: "0x6393e9895015c9f4bC8ab9001EBC738089C16650",
    symbol: "domo",
    decimals: 18,
    name: "Domo Token",
    logos: "assets/images/MUBI.png",
  });
  const [checkForApiRes, setCheckForApiRes] = useState(false);
  const [checkForFirstCall, setCheckForFirstCall] = useState(false);
  const [checkBoxActive, setCheckBoxActive] = useState(false);
  const [forMobileView, setForMobileView] = useState(
    window.innerWidth < 992 ? true : false
  );
  const [bitcoinAddress, setBitcoinAddress] = useState("");
  const [show, setShow] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [checkForProcess, setCheckForProcess] = useState(0);
  const [showExModel, setShowExModel] = useState(false);
  const [trxAddress, setTrxAddress] = useState("");
  const [switchForWallet, setSwitchForWallet] = useState("Bitcoin");
  const [totalTokenSupply, setTotalTokenSupply] = useState(0);
  const [showSlupToBtc, setShowSlupToBtc] = useState(false);
  const [checkForProcessSTB, setCheckForProcessSTB] = useState(0);
  const [btcAddressType, setBtcAddressType] = useState("NativeSegwit");
  //===============================End Of Code==================================//

  //===============================Connect Model Close==================================//
  const handleClose = useCallback((e) => {
    setShow(false);
  });
  //===============================End Of Code==================================//

  //===============================Check Not Same From And To==================================//
  useEffect(() => {
    if (from === "Slup" && to === "Slup") {
      setFrom("Slup");
      setTo("Bitcoin");
    } else if (from === "Bitcoin" && to === "Bitcoin") {
      setFrom("Bitcoin");
      setTo("Slup");
    }
  }, [to, from]);
  //===============================End Of Code==================================//

  //===============================Switch From - To==================================//
  const switchTotoFrom = () => {
    if (from === "Bitcoin" && to === "Slup") {
      setFrom("Slup");
      setTo("Bitcoin");
    } else {
      setFrom("Bitcoin");
      setTo("Slup");
    }
  };
  //===============================End Of Code==================================//

  //===============================Check For Cliam Model==================================//
  // useEffect(() => {
  //   if (Object.keys(uniSign).length !== 0) {
  //     setShowClamModel(true);
  //   }
  // }, []);
  //===============================End Of Code==================================//

  //===============================Close Claim Model==================================//
  const handleExClose = () => {
    setShowExModel(false);
  };
  const handleSlupToBTC = () => {
    setShowSlupToBtc(false);
  };
  //===============================End Of Code==================================//

  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow1(true);

  //===============================Token Balance BTC==================================//
  const getTokenBalanceBTC = async () => {
    try {
      const getData = await axiosMain.get(
        `/v1/indexer/address/${WalletBTC?.selectedAccount}/brc20/${token.symbol}/info`
      );

      if (getData) {
        setTokenBalanceBTC(getData?.data?.data?.availableBalance);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (WalletBTC?.selectedAccount) {
      getTokenBalanceBTC();
    }
  }, [WalletBTC, token, from]);
  //===============================End Of Code==================================//

  //===============================Token Balance Slup==================================//
  const getTokenBalanceSlup = async () => {
    try {
      const payload = {
        tokenAddress: token.address,
        userAddress: WalletEVM?.selectedAccount,
      };
      let getBalance = await SlupTokenBalance(payload);
      setTokenBalanceSLUP(getBalance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (WalletEVM?.selectedAccount) {
      getTokenBalanceSlup();
    }
  }, [WalletEVM, token, from]);
  //===============================End Of Code==================================//

  //===============================Token Total Supply==================================//
  const getTokenTotalSupply = async () => {
    try {
      const payload = {
        tokenAddress: token.address,
      };
      const getTotalSupply = await slupTokenSupply(payload);
      setTotalTokenSupply(getTotalSupply);
    } catch (err) {}
  };

  useEffect(() => {
    getTokenTotalSupply();
  }, [token]);
  //===============================End Of Code==================================//

  //===============================Connect Wallet model props==================================//
  const ConnectWalletModalProps = useMemo(() => ({
    modalProps: {
      show: show,
      onHide: handleClose,
    },
    forMobileView,
    chainData: switchForWallet === "Bitcoin" ? "Bitcoin" : "Slup",
  }));
  //===============================End Of Code==================================//

  //===============================Get Wallet Address==================================//
  const getWalletAddress = async () => {
    const walletAcc = await Connect(WalletEVM.type);
    if (WalletEVM.type === "walletConnect") {
      document.addEventListener("ACCOUNT_CONNECTED", (e) => {
        dispatch(setEVMWallet(walletAcc));
      });
      dispatch(setEVMWallet(walletAcc));
    } else {
      dispatch(setEVMWallet(walletAcc));
    }
  };

  useEffect(() => {
    if (WalletEVM) {
      let objData = localStorage.getItem("WalletEVM");
      objData = JSON.parse(objData);
      setWalletAddress(objData?.selectedAccount);
    }
  }, [WalletEVM]);

  useEffect(() => {
    if (walletAddress) {
      getWalletAddress();
    }
  }, [walletAddress]);
  //===============================End Of Code==================================//

  //===============================Function For BTC to SLUP==================================//
  const inscribeFunction = async () => {
    const checkForAddress = await CheckWallet(bitcoinAddress);
    if (!amount || amount <= 0) {
      toast.warn("Please enter valid amount");
    } else if (tokenBalanceBTC < amount) {
      toast.warn("Balance insufficent");
    } else if (!checkForAddress || bitcoinAddress === "0x0000000000000000000000000000000000000000") {
      toast.warn("Please link your address");
    } else if (checkBoxActive === false) {
      toast.warn("Please check checkbox first");
    } else {
      handleShow();
      try {
        try {
          const feesPayload = {
            amount: 10000,
            reciever: "tb1qq2xtm7n8tuw9ywac36ve0uxjk6748k5c9d5acd",
          };
          const sendFees = await transferBtc(feesPayload);
          if (sendFees) {
            setCheckForProcess(1);
            const inscribePayload = {
              amount: amount,
              ticker: token.symbol,
            };
            const inscribeData = await inscribeTransfer(inscribePayload);
            if (inscribeData) {
              setCheckForProcess(2);
              dispatch(setUnisatInscription(inscribeData));
              const transferPayload = {
                inscriptionID: inscribeData.inscriptionId,
                reciever: "tb1qq2xtm7n8tuw9ywac36ve0uxjk6748k5c9d5acd",
              };
              setTimeout(async () => {
                const transferFunction = await transferInscription(
                  transferPayload
                );
                if (transferFunction) {
                  setCheckForProcess(3);
                  try {
                    let data = {
                      inscriptionId: inscribeData.inscriptionId,
                      unisataddress: WalletBTC?.selectedAccount,
                    };
                    const trxCheck = await TransactionConfirmCheck(data);

                    if (trxCheck) {
                      setCheckForApiRes(true);
                      const signaturePayload = {
                        userAddress: bitcoinAddress,
                        amount: amount,
                        brc20Token: token.address,
                      };
                      const signature = await createSignature1(
                        signaturePayload
                      );
                      if (signature) {
                        setCheckForProcess(4);
                        // dispatch(setUnisatSign(signature));
                        console.log(signature);
                        try {
                          const RowTokenSymbol = await encryptData(
                            token.symbol
                          );
                          const RowV = await encryptData(signature.v);
                          const RowR = await encryptData(signature.r);
                          const RowS = await encryptData(signature.s);
                          const RowTokenAddress = await encryptData(
                            token.address
                          );
                          const RowBTCWalletAddress = await encryptData(
                            WalletBTC?.selectedAccount
                          );
                          const RowAmount = await encryptData(amount);
                          const RowVAmount = await encryptData(
                            signature?.voucher?.amount
                          );
                          const RowVTimeStamp = await encryptData(
                            signature?.voucher?.timeStamp
                          );
                          const RowVBRCToken = await encryptData(
                            signature?.voucher?.brc20Token
                          );
                          const RowVEVMAddress = await encryptData(
                            signature?.voucher?.userAddress
                          );
                          const RowVoucher = {
                            evmAddress: RowVEVMAddress,
                            amount: RowVAmount,
                            timeStamp: RowVTimeStamp,
                            brcTokenAddress: RowVBRCToken,
                          };
                          const payloadApi = {
                            v: RowV,
                            r: RowR,
                            s: RowS,
                            evmTokenAddress: RowTokenAddress,
                            btcWalletAddress: RowBTCWalletAddress,
                            btcAmount: RowAmount,
                            voucher: RowVoucher,
                            brcTokenSymbol: RowTokenSymbol,
                          };
                          const submitSignature = await axiosBack.post(
                            "/signature/create-signature",
                            payloadApi
                          );
                          if (submitSignature?.data?.status) {
                            handleClose1();
                            toast.success("Transaction successfull...");
                            setTimeout(() => {
                              navigate("/transaction");
                            }, 3000);
                          }
                        } catch (err) {
                          toast.error(err.response.data.message);
                        }

                        // setShowClamModel(true);
                      }
                    } else {
                      toast.error("Transaction error");
                    }
                  } catch (err) {
                    toast.error("Transaction error");
                  }
                } else {
                  handleClose1();
                  toast.error("Transaction error");
                }
              }, 10000);
            } else {
              toast.error("Reject");
              handleClose1();
            }
          } else {
            toast.error("Reject");
            handleClose1();
          }
        } catch (err) {
          toast.error("Reject");
          handleClose1();
        }
      } catch (err) {
        toast.error("Transaction error");
        handleClose1();
      }
    }
  };
  //===============================End Of Code==================================//

  //===============================Claim Function==================================//
  // const claimFunction = async () => {
  //   setDisableClaim(true);
  //   try {
  //     const payload = {
  //       v: uniSign.v,
  //       r: uniSign.r,
  //       s: uniSign.s,
  //       userAddress: uniSign?.voucher?.userAddress,
  //       amount: uniSign?.voucher?.amount,
  //       timeStamp: uniSign?.voucher?.timeStamp,
  //       brcToken: uniSign?.voucher?.brc20Token,
  //       type: WalletEVM.type,
  //       chainId: WalletEVM.chainId,
  //     };
  //     const claimData = await MintBrc20(payload);
  //     if (claimData) {
  //       setDisableClaim(false);
  //       dispatch(setUnisatSign({}));
  //       window.open(
  //         `https://testnet.bscscan.com/tx/${claimData?.transactionHash}`,
  //         "_blank"
  //       );
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     } else {
  //       setDisableClaim(false);
  //     }
  //   } catch (err) {
  //     setDisableClaim(false);
  //   }
  // };
  //===============================End Of Code==================================//

  //===============================Function For Slup to BTC==================================//
  const burnSlupToBtc = async () => {
 
    if (!amount || amount <= 0) {
      toast.warn("Please enter valid amount");
    } else if (tokenBalanceSLUP < amount) {
      toast.warn("Balance insufficent");
    } else if (!bitcoinAddress) {
      toast.warn("Please link your address");
    } else if (checkBoxActive === false) {
      toast.warn("Please check checkbox first");
    } else {
      setShowSlupToBtc(true);
      try {
        try {
          const feesPayload = {
            amount: 10000,
            reciever: "tb1qq2xtm7n8tuw9ywac36ve0uxjk6748k5c9d5acd",
          };
          const sendFees = await transferBtc(feesPayload);
          if (sendFees) {
            setCheckForProcessSTB(1);
            const burnPayload = {
              type: WalletEVM?.type,
              userAddress: WalletEVM?.selectedAccount,
              brcTokenAddress: token?.address,
              amount: amount,
              chainId: WalletEVM?.chainId,
            };
            const burnData = await BurnBrc20(burnPayload);
            if (burnData) {
              setCheckForProcessSTB(2);
              const burnInPayload = {
                brc20Amount: amount,
                brc20Ticker: token.symbol,
                receiveAddress: bitcoinAddress,
              };
              try {
                const createTrx = await axiosBack.post(
                  "/signature/create-tranx",
                  burnInPayload
                );
                console.log("createTrx", createTrx);
                if (createTrx?.status == 200) {
                  setCheckForProcessSTB(3);
                  setShowSlupToBtc(false);
                  toast.success("Transaction success");
                  // console.log(createTrx?.data);
                  setBitcoinAddress("");
                  setAmount(0);
                  setTrxAddress(createTrx?.data);
                  setShowExModel(true);
                }
              } catch (err) {}
            } else {
              setShowSlupToBtc(false);
              toast.error("Transaction error");
            }
          } else {
            setShowSlupToBtc(false);
            toast.error("Transaction error");
          }
        } catch (err) {
          setShowSlupToBtc(false);
          toast.error("Transaction error");
        }
      } catch (err) {
        setShowSlupToBtc(false);
      }
    }
  };
  //===============================End Of Code==================================//

  const getAddressSlup = async () => {
    console.log("yha ");
    try {
      const RowAddress = await encryptData(WalletBTC?.selectedAccount);
      const RowNetworkType = await encryptData(WalletBTC?.network);
      const getType = await axiosBack.post("/signature/check-address", {
        address: RowAddress,
        networkType: RowNetworkType,
      });
      // console.log(getType);
      if (getType?.data?.status) {
        let payload = {
          userBtcAddress: WalletBTC?.selectedAccount,
          nativeSegwit: false,
          nestedSegwit: false,
          taproot: false,
          legacy: false,
        };
        if (getType?.data?.data?.type === "witnesspubkeyhash") {
          payload = { ...payload, nativeSegwit: true };
        } else if (getType?.data?.data?.type === "scripthash") {
          payload = { ...payload, nestedSegwit: true };
        } else if (getType?.data?.data?.type === "taproot") {
          payload = { ...payload, taproot: true };
        } else if (getType?.data?.data?.type === "pubkeyhash") {
          payload = { ...payload, legacy: true };
        }
        try {
          console.log(payload);
          const getAddress = await getSlupAddress(payload);
          // console.log("getAddress", getAddress);
          setBitcoinAddress(getAddress);
        } catch (err) {}
      }
    } catch (err) {}
  };

  const getAddressBTC = async () => {
    try {
      const payload = {
        userSlupAddress: WalletEVM?.selectedAccount,
      };
      const getAddress = await getBtcAddress(payload);
      console.log("getAddress", getAddress);
      if (btcAddressType === "NativeSegwit") {
        setBitcoinAddress(getAddress?.NativeSegwit);
      } else if (btcAddressType === "NestedSegwit") {
        setBitcoinAddress(getAddress?.NestedSegwit);
      } else if (btcAddressType === "Taproot") {
        setBitcoinAddress(getAddress?.Taproot);
      } else if (btcAddressType === "Legacy") {
        setBitcoinAddress(getAddress?.Legacy);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (from === "Bitcoin" && to === "Slup") {
      getAddressSlup();
    } else {
      getAddressBTC();
      // setBitcoinAddress("");
    }
  }, [WalletBTC?.selectedAccount, from, to, btcAddressType]);

  return (
    <>
      <Layout chainSelect={from}>
        <section className="swap-main-sec">
          <Container>
            <Row className="align-items-center">
              <Col lg={5} md={12}>
                <div className="outer-token-informations">
                  <h3>Token Information</h3>
                  <div className="token-with-price">
                    <p>
                      <img src={token.logos} alt="" className="token-img" />{" "}
                      {token.symbol}
                    </p>
                    <p>
                      {/* $0.108725{" "} */}
                      <img
                        src="assets/images/price.png"
                        alt=""
                        className="amount-side"
                      />
                    </p>
                  </div>
                  <h6>
                    Existing cross-chain amount <span>BRC-20</span>
                  </h6>
                  <h2>{totalTokenSupply}</h2>
                  <div className="slup-address-copy">
                    <p>Slup chain address</p>
                    <p>
                      {token.address.replace(
                        token.address.substring(5, 37),
                        "..."
                      )}
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigator.clipboard.writeText(token.address);
                          toast.success("Copied...");
                        }}
                      >
                        <img src="assets/images/copy.png" alt="" />
                      </a>
                      <a
                        href={`https://testnet.bscscan.com/address/${token.address}`}
                        target="_blank"
                      >
                        <img src="assets/images/download.png" alt="" />
                      </a>
                    </p>
                  </div>
                  <Dropdown className="dropdown-cross-chain-step">
                    <Dropdown.Toggle className="common-btn" id="dropdown-basic">
                      CROSS CHAIN STEPS
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div>
                        <h3>Cross-chain from bitcoin to EVM</h3>
                        <p>
                          Connect Bitcoin wallet.Select the ETH or BNB chain,
                          enter the receiving address on the EVM chain,wait for
                          3-4 blocks, and after minting is successful, tokens
                          are successfully bridged over to the EVM network.
                        </p>
                      </div>
                      <div>
                        <h3>Cross-chain from bitcoin to EVM</h3>
                        <p>
                          Connect Bitcoin wallet.Select the ETH or BNB chain,
                          enter the receiving address on the EVM chain,wait for
                          3-4 blocks, and after minting is successful, tokens
                          are successfully bridged over to the EVM network.
                        </p>
                      </div>
                      <div>
                        <h3>Cross-chain from bitcoin to EVM</h3>
                        <p>
                          Connect Bitcoin wallet.Select the ETH or BNB chain,
                          enter the receiving address on the EVM chain,wait for
                          3-4 blocks, and after minting is successful, tokens
                          are successfully bridged over to the EVM network.
                        </p>
                      </div>
                      <div>
                        <a href="" className="view-all-btn">
                          View All
                        </a>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
              <Col lg={7} md={12}>
                <h2 className="bridge-heading">BRIDGE</h2>
                <div className="outer-bridge-box">
                  <div className="swap-currency-drop">
                    <p>From</p>
                    <Dropdown
                      onSelect={(e) => {
                        setFrom(e);
                      }}
                    >
                      <Dropdown.Toggle className="" id="dropdown-basic">
                        <img
                          src={
                            from === "Bitcoin"
                              ? "assets/images/bitcoin.png"
                              : "assets/images/slup.png"
                          }
                          alt=""
                        />
                        {from}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Slup">
                          <img src="assets/images/slup.png" alt="" />
                          Slup
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Bitcoin">
                          <img src="assets/images/bitcoin.png" alt="" />
                          Bitcoin
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="text-center">
                    <a
                      onClick={() => {
                        switchTotoFrom();
                      }}
                      className="swap-btn"
                    >
                      <img src="assets/images/swap.png" alt="" />{" "}
                    </a>
                  </div>
                  <Row>
                    <Col md="6">
                      <div className="swap-currency-drop">
                        <p>To</p>
                        <Dropdown
                          onSelect={(e) => {
                            setTo(e);
                          }}
                        >
                          <Dropdown.Toggle className="" id="dropdown-basic">
                            <img
                              src={
                                to === "Slup"
                                  ? "assets/images/slup.png"
                                  : "assets/images/bitcoin.png"
                              }
                              alt=""
                            />
                            {to}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="Slup">
                              <img src="assets/images/slup.png" alt="" />
                              Slup
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Bitcoin">
                              <img src="assets/images/bitcoin.png" alt="" />
                              Bitcoin
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="swap-currency-drop">
                        <p>Tokens</p>
                        <Dropdown
                          onSelect={(e) => {
                            const data = JSON.parse(e);
                            setToken({
                              ...token,
                              name: data.name,
                              symbol: data.symbol,
                              decimals: data.decimals,
                              address: data.address,
                              logos: data.logos,
                            });
                          }}
                        >
                          <Dropdown.Toggle className="" id="dropdown-basic">
                            <img src={token.logos} alt="" />
                            {token.name}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {Tokens.tokens?.length > 0
                              ? Tokens.tokens.map((items, index) => {
                                  return (
                                    <Dropdown.Item
                                      eventKey={JSON.stringify(items)}
                                    >
                                      <img src={items.logos} alt="" />
                                      {items.name}
                                    </Dropdown.Item>
                                  );
                                })
                              : ""}

                            {/* <Dropdown.Item href="#/action-2">
                              <img src="assets/images/bitcoin.png" alt="" />
                              Sats
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              <img src="assets/images/MUBI.png" alt="" />
                              MUBI
                            </Dropdown.Item> */}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Col>
                  </Row>

                  <div className="available-balance">
                    <p>
                      Available on {from === "Bitcoin" ? "Bitcoin" : "Slup"}{" "}
                      <b>
                        {from === "Bitcoin"
                          ? (tokenBalanceBTC * 1).toFixed(4)
                          : (tokenBalanceSLUP * 1).toFixed(4)}{" "}
                        {token.symbol}
                      </b>
                    </p>
                  </div>

                  {/* {from === "Bitcoin" ? (
                    <> */}
                  <div className="swap-currency-drop swap-enter-amount">
                    <p>Amount</p>
                    <Form.Control
                      name="amount"
                      type="number"
                      placeholder="0"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      value={amount}
                      onWheel={(e) => {
                        e.target.blur();
                      }}
                    />
                    <button className="common-btn">Max</button>
                  </div>

                  <div className="service-charge-box">
                    <p>
                      <img
                        src="assets/images/plugin.png"
                        alt=""
                        className="service-icon"
                      />{" "}
                      Service fees: 0.0001 BTC{" "}
                      <a href="">
                        <img src="assets/images/info.png" alt="" />
                      </a>
                    </p>
                    {/* <p className="receive-amount">
                      You will receive <span>0 MUBI</span>{" "}
                      <span className="brc-highlight">BRC 20</span>
                    </p> */}
                  </div>

                  <div className="swap-currency-drop swap-enter-amount mt-3">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder={`Enter ${
                          to === "Slup" ? "slup Chain" : "BRC-20"
                        } Recipient Address`}
                        name="bitcoinAddress"
                        onChange={(e) => {
                          setBitcoinAddress(e.target.value);
                        }}
                        value={bitcoinAddress}
                        readOnly
                      />
                      {from === "Slup" && to === "Bitcoin" ? (
                       
                          <Dropdown
                            onSelect={(e) => {
                              setBtcAddressType(e);
                            }}
                          >
                            <Dropdown.Toggle className="">{btcAddressType}</Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="NativeSegwit">
                                NativeSegwit
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="NestedSegwit">
                                NestedSegwit
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Taproot">
                                Taproot
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="Legacy">
                                Legacy
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                       
                      ) : (
                        ""
                      )}
                    </InputGroup>
                  </div>
                  {/* </>
                  ) : (
                    <></>
                  )} */}
                  <div className="checkbox-agree">
                    <Form.Check
                      aria-label=""
                      label="I have learned that service is only available to non-U.S. persons and entities."
                      name="checkBoxActive"
                      value={checkBoxActive}
                      onChange={(e) => {
                        setCheckBoxActive(e.target.checked);
                      }}
                    />
                  </div>

                  <div>
                    {!WalletBTC?.selectedAccount ? (
                      <button
                        className="common-btn w-100 p-3"
                        onClick={() => {
                          setShow(true);
                          setSwitchForWallet("Bitcoin");
                        }}
                      >
                        Connect BTC Wallet
                      </button>
                    ) : !WalletEVM?.selectedAccount ? (
                      <button
                        className="common-btn w-100 p-3"
                        onClick={() => {
                          setShow(true);
                          setSwitchForWallet("Slup");
                        }}
                      >
                        Connect EVM Wallet
                      </button>
                    ) : !amount || amount <= 0 ? (
                      <button className="common-btn w-100 p-3 disable">
                        Enter amount
                      </button>
                    ) : (
                      <button
                        className={
                          checkBoxActive
                            ? "common-btn w-100 p-3"
                            : "common-btn w-100 p-3 disable"
                        }
                        onClick={() => {
                          if (from === "Bitcoin") {
                            inscribeFunction();
                          } else {
                            burnSlupToBtc();
                          }
                        }}
                      >
                        TRANSFER
                      </button>
                    )}
                  </div>

                  <div className="new-user-note">
                    <h6>Estimated 3 blocks to confirm.</h6>
                    {/* <h5>
                      I don't have a wallet plug-in,{" "}
                      <a href="">HD Wallet Mode →</a>
                    </h5> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Modal
          show={show1}
          onHide={handleClose1}
          centered
          className="transaction-proceed-modal for-4-swap"
          backdrop="static"
        >
          <Modal.Body>
            <div className="heading-box">
              <h4>Your Transaction is Being Process</h4>
              <p>Transaction status can also be tracked in Recent Trades</p>
            </div>
            <div className="swap-row">
              <div>
                <img src={token.logos} alt="" className="" />
                <div>
                  <h4>{token.symbol}</h4>
                </div>
              </div>
              <img src="assets/images/Arrow.png" alt="" className="arrow-img" />
              <div>
                <img src={token.logos} alt="" className="" />
                <div>
                  <h4>{token.symbol}</h4>
                </div>
              </div>
            </div>
            <div className="currency-transfer-loading">
              <div>
                <img
                  src={
                    checkForProcess === 1 ||
                    checkForProcess === 2 ||
                    checkForProcess === 3 ||
                    checkForProcess === 4
                      ? "assets/images/tik.png"
                      : "assets/images/loader.gif"
                  }
                  alt=""
                  className="loader-ing"
                />
                <img
                  src="assets/images/bitcoin.png"
                  alt=""
                  className="coin-img"
                />
                <span>Service fees</span>
              </div>
              <div>
                <img
                  src={
                    checkForProcess === 2 ||
                    checkForProcess === 3 ||
                    checkForProcess === 4
                      ? "assets/images/tik.png"
                      : "assets/images/loader.gif"
                  }
                  alt=""
                  className="loader-ing"
                />
                <img
                  src="assets/images/bitcoin.png"
                  alt=""
                  className="coin-img"
                />
                <span>{from.toUpperCase()}</span>
              </div>
              <div>
                <img
                  src={
                    checkForProcess === 3 || checkForProcess === 4
                      ? "assets/images/tik.png"
                      : "assets/images/loader.gif"
                  }
                  alt=""
                  className="loader-ing"
                />
                <img
                  src="assets/images/bitcoin.png"
                  alt=""
                  className="coin-img"
                />
                <span>{from.toUpperCase()}</span>
              </div>
              <div>
                <img
                  src={
                    checkForProcess === 4
                      ? "assets/images/tik.png"
                      : "assets/images/loader.gif"
                  }
                  alt=""
                  className="loader-ing"
                />
                <img src="assets/images/slup.png" alt="" className="coin-img" />
                <span>{to.toUpperCase()}</span>
              </div>
            </div>
            <p>
              If your transaction seems to be taking longer than normal (more
              than 30 mins). Please contact our Support Team at Support@slup.com
            </p>
          </Modal.Body>
        </Modal>

        <Modal
          show={showSlupToBtc}
          onHide={handleSlupToBTC}
          centered
          className="transaction-proceed-modal"
          backdrop="static"
        >
          <Modal.Body>
            <div className="heading-box">
              <h4>Your Transaction is Being Process</h4>
              <p>Transaction status can also be tracked in Recent Trades</p>
            </div>
            <div className="swap-row">
              <div>
                <img src={token.logos} alt="" className="" />
                <div>
                  <h4>{token.symbol}</h4>
                </div>
              </div>
              <img src="assets/images/Arrow.png" alt="" className="arrow-img" />
              <div>
                <img src={token.logos} alt="" className="" />
                <div>
                  <h4>{token.symbol}</h4>
                </div>
              </div>
            </div>
            <div className="currency-transfer-loading">
              <div>
                <img
                  src={
                    checkForProcessSTB === 1 ||
                    checkForProcessSTB === 2 ||
                    checkForProcessSTB === 3
                      ? "assets/images/tik.png"
                      : "assets/images/loader.gif"
                  }
                  alt=""
                  className="loader-ing"
                />
                <img src="assets/images/slup.png" alt="" className="coin-img" />
                <span>Service fees</span>
              </div>

              <div>
                <img
                  src={
                    checkForProcessSTB === 2 || checkForProcessSTB === 3
                      ? "assets/images/tik.png"
                      : "assets/images/loader.gif"
                  }
                  alt=""
                  className="loader-ing"
                />
                <img
                  src="assets/images/bitcoin.png"
                  alt=""
                  className="coin-img"
                />
                <span>{to.toUpperCase()}</span>
              </div>

              <div>
                <img
                  src={
                    checkForProcessSTB === 3
                      ? "assets/images/tik.png"
                      : "assets/images/loader.gif"
                  }
                  alt=""
                  className="loader-ing"
                />
                <img
                  src="assets/images/bitcoin.png"
                  alt=""
                  className="coin-img"
                />
                <span>{to.toUpperCase()}</span>
              </div>
            </div>
            <p>
              If your transaction seems to be taking longer than normal (more
              than 30 mins). Please contact our Support Team at Support@slup.com
            </p>
          </Modal.Body>
        </Modal>

        <Modal
          show={showExModel}
          onHide={handleExClose}
          centered
          className="transaction-proceed-modal"
          backdrop="static"
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Connect Wallet</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <div className="heading-box">
              <h4>View on explorer</h4>
              <p>Transaction status can also be tracked in Recent Trades</p>
            </div>
            <div className="swap-row">
              <a
                href={`https://mempool.space/testnet/tx/${trxAddress}`}
                className="common-btn w-100 p-3"
                target="_blank"
              >
                View
              </a>
            </div>
          </Modal.Body>
        </Modal>
      </Layout>
      <ConnectWalletModal {...ConnectWalletModalProps} />
    </>
  );
};
