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

export const Homepage = () => {
  const dispatch = useDispatch();
  const { WalletBTC, WalletEVM, uniIns, uniSign } = useAuth();
  // console.log("uniSign", uniSign);
  const [show1, setShow1] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
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
  const [bitcoinAddress, setBitcoinAddress] = useState();
  const [show, setShow] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [checkForProcess, setCheckForProcess] = useState(0);
  const [showClamModel, setShowClamModel] = useState(false);
  const handleClose = useCallback((e) => {
    setShow(false);
  });
  const [disableClaim, setDisableClaim] = useState(false);
  const [switchForWallet, setSwitchForWallet] = useState("Bitcoin");

  useEffect(() => {
    if (from === "Slup" && to === "Slup") {
      setFrom("Slup");
      setTo("Bitcoin");
    } else if (from === "Bitcoin" && to === "Bitcoin") {
      setFrom("Bitcoin");
      setTo("Slup");
    }
  }, [to, from]);

  useEffect(() => {
    if (Object.keys(uniSign).length !== 0) {
      setShowClamModel(true);
    }
  }, []);

  const switchTotoFrom = () => {
    if (from === "Bitcoin" && to === "Slup") {
      setFrom("Slup");
      setTo("Bitcoin");
    } else {
      setFrom("Bitcoin");
      setTo("Slup");
    }
  };

  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow1(true);

  const handleClamClose = () => {
    setShowClamModel(false);
  };

  const getTokenBalance = async () => {
    try {
      const getData = await axiosMain.get(
        `/v1/indexer/address/${WalletBTC?.selectedAccount}/brc20/${token.symbol}/info`
      );

      if (getData) {
        setTokenBalance(getData?.data?.data?.availableBalance);
      }

      // console.log(getData);
    } catch (err) {}
  };

  useEffect(() => {
    if (WalletBTC) {
      getTokenBalance();
    }
  }, [WalletBTC, token]);

  const ConnectWalletModalProps = useMemo(() => ({
    modalProps: {
      show: show,
      onHide: handleClose,
    },
    // onWalletChange,
    forMobileView,
    chainData: switchForWallet === "Bitcoin" ? "Bitcoin" : "Slup",
  }));

  const getWalletAddress = async () => {
    //=================Account change code===============//
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
  const inscribeFunction = async () => {
    const checkForAddress = await CheckWallet(bitcoinAddress);

    if (!amount || amount <= 0) {
      toast.warn("Please enter valid amount");
    } else if (!checkForAddress) {
      toast.warn("Please enter valid wallet address");
    } else if (checkBoxActive === false) {
      toast.warn("Please check checkbox first");
    } else {
      handleShow();
      try {
        const inscribePayload = {
          amount: amount,
          ticker: token.symbol,
        };
        const inscribeData = await inscribeTransfer(inscribePayload);
        // console.log(inscribeData);
        if (inscribeData) {
          setCheckForProcess(1);
          dispatch(setUnisatInscription(inscribeData));
          const transferPayload = {
            inscriptionID: inscribeData.inscriptionId,
            reciever: "tb1qq2xtm7n8tuw9ywac36ve0uxjk6748k5c9d5acd",
          };
          // console.log("transferPayload", transferPayload);
          setTimeout(async () => {
            const transferFunction = await transferInscription(transferPayload);
            // console.log(transferFunction);
            if (transferFunction) {
              setCheckForProcess(2);
              // setTimeout(async () => {
              try {
                let data = {
                  inscriptionId: inscribeData.inscriptionId,
                  unisataddress: WalletBTC?.selectedAccount,
                };
                const trxCheck = await TransactionConfirmCheck(data);
                // const getTransfaredBalance = await axiosMain.get(
                //   `/v1/indexer/inscription/info/${uniIns.inscriptionId}`
                // );
                // console.log("getTransfaredBalance", getTransfaredBalance);
                // if (
                //   getTransfaredBalance?.data?.data?.address ===
                //   "tb1qg6l5arguyze2u96xgc0aqdl8cqfnmaawa78nj7"
                // )
                if (trxCheck) {
                  setCheckForApiRes(true);
                  const signaturePayload = {
                    userAddress: bitcoinAddress,
                    amount: amount,
                    brc20Token: token.address,
                  };
                  const signature = await createSignature1(signaturePayload);
                  // console.log("signature", signature);
                  if (signature) {
                    setCheckForProcess(3);
                    dispatch(setUnisatSign(signature));
                    handleClose1();
                    setShowClamModel(true);
                  }
                } else {
                  toast.error("Transaction error");
                }
              } catch (err) {
                toast.error("Transaction error");
              }
              // }, 60000);
            } else {
              handleClose1();
              toast.error("Transaction error");
            }
          }, 10000);
        } else {
          toast.error("Reject");
          handleClose1();
        }
      } catch (err) {
        toast.error("Transaction error");
        handleClose1();
      }
    }
  };

  const claimFunction = async () => {
    setDisableClaim(true);
    try {
      const payload = {
        v: uniSign.v,
        r: uniSign.r,
        s: uniSign.s,
        userAddress: uniSign?.voucher?.userAddress,
        amount: uniSign?.voucher?.amount,
        timeStamp: uniSign?.voucher?.timeStamp,
        brcToken: uniSign?.voucher?.brc20Token,
        type: WalletEVM.type,
        chainId: WalletEVM.chainId,
      };
      const claimData = await MintBrc20(payload);
      if (claimData) {
        setDisableClaim(false);
        dispatch(setUnisatSign({}));
        window.open(
          `https://testnet.bscscan.com/tx/${claimData?.transactionHash}`,
          "_blank"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setDisableClaim(false);
      }
    } catch (err) {
      setDisableClaim(false);
    }
  };

  const burnSlupToBtc = async () => {
    if (!amount || amount <= 0) {
      toast.warn("Please enter valid amount");
    } else if (checkBoxActive === false) {
      toast.warn("Please check checkbox first");
    } else {
      try {
        const burnPayload = {
          type: WalletEVM?.type,
          userAddress: WalletEVM?.selectedAccount,
          brcTokenAddress: token?.address,
          amount: amount,
          chainId: WalletEVM?.chainId,
        };
        const burnData = await BurnBrc20(burnPayload);
        if (burnData) {
          const burnInPayload = {
            amount: amount,
            ticker: token.symbol,
          };
          try {
            const burnInscribe = await inscribeTransfer(burnInPayload);
            if (burnInscribe) {
            }
          } catch (err) {}
        } else {
          toast.error("Transaction error");
        }
      } catch (err) {}
    }
  };

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
                      $0.108725{" "}
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
                  <h2>912,408,210.38</h2>
                  <div className="slup-address-copy">
                    <p>Slup chain address</p>
                    <p>
                      0x38...DE93
                      <a href="">
                        <img src="assets/images/copy.png" alt="" />
                      </a>
                      <a href="">
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
                        {tokenBalance} {token.symbol}
                      </b>
                    </p>
                  </div>

                  {/* {from === "Bitcoin" ? (
                    <> */}
                  <div className="swap-currency-drop swap-enter-amount">
                    <p>Amount</p>
                    <Form.Control
                      name="amount"
                      type="text"
                      placeholder="0"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      value={amount}
                    />
                    <button className="common-btn">Max</button>
                  </div>

                  {/* <div className="service-charge-box">
                    <p>
                      <img
                        src="assets/images/plugin.png"
                        alt=""
                        className="service-icon"
                      />{" "}
                      Service fees: 0.03 BNB{" "}
                      <a href="">
                        <img src="assets/images/info.png" alt="" />
                      </a>
                    </p>
                    <p className="receive-amount">
                      You will receive <span>0 MUBI</span>{" "}
                      <span className="brc-highlight">BRC 20</span>
                    </p>
                  </div> */}

                  <div className="swap-currency-drop swap-enter-amount mt-3">
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
                    />
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
                    <h5>
                      I don't have a wallet plug-in,{" "}
                      <a href="">HD Wallet Mode →</a>
                    </h5>
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
                    checkForProcess === 1 ||
                    checkForProcess === 2 ||
                    checkForProcess === 3
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
                    checkForProcess === 2 || checkForProcess === 3
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
                    checkForProcess === 3
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
          show={showClamModel}
          onHide={handleClamClose}
          centered
          className="transaction-proceed-modal"
          backdrop="static"
        >
          <Modal.Body>
            <div className="heading-box">
              <h4>Clam Your Amount</h4>
              <p>Transaction status can also be tracked in Recent Trades</p>
            </div>
            <div className="swap-row">
              <button
                className="common-btn w-100 p-3"
                onClick={() => {
                  claimFunction();
                }}
                disabled={disableClaim}
              >
                {disableClaim ? "Processing" : "Clam Now"}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </Layout>
      <ConnectWalletModal {...ConnectWalletModalProps} />
    </>
  );
};
