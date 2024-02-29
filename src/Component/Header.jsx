import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Col,
  Row,
  NavDropdown,
  Modal,
  Form,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ConnectWalletModal from "./ui/ConnectWalletModal";
import useAuth from "../hooks/useAuth";
import { Connect, onDisconnect } from "../helpers/Connect";
import { useDispatch } from "react-redux";
import { setBitcoinWallet, setEVMWallet } from "../store/reducers/authReducer";
import { toast } from "react-toastify";
import { linkAddress } from "../helpers/linkAddress";
import { Disconnect } from "../helpers/Web3Helper";
import { encryptData } from "../helpers/encryption";
import axiosBack from "../http/axios/axios_Back";

export default function Header(props) {
  //===============================Global Variables==================================//
  const dispatch = useDispatch();
  const { WalletEVM, WalletBTC } = useAuth();
  //===============================End Of Code==================================//

  //===============================Local Variables==================================//
  const [show, setShow] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [forMobileView, setForMobileView] = useState(
    window.innerWidth < 992 ? true : false
  );
  const [switchForWallet, setSwitchForWallet] = useState("Bitcoin");
  const handleClose = useCallback((e) => {
    setShow(false);
  });
  const [addressLink, setAddressLink] = useState({
    nativeAddress: "",
    nestedAddress: "",
    taprootAddress: "",
    legacyAddress: "",
  });
  const [disableLink, setDisableLink] = useState(false);
  const [showLinkModel, setShowLinkModel] = useState(false);
  const [checkForTrueAddressNative, setCheckForTrueAddressNative] =
    useState(false);
  const [checkForTrueAddressNested, setCheckForTrueAddressNested] =
    useState(false);
  const [checkForTrueAddressTaproot, setCheckForTrueAddressTaproot] =
    useState(false);
  const [checkForTrueAddressLegacy, setCheckForTrueAddressLegacy] =
    useState(false);

  //===============================End Of Code==================================//

  //===============================Connect Wallet model props==================================//
  const ConnectWalletModalProps = useMemo(() => ({
    modalProps: {
      show: show,
      onHide: handleClose,
    },
    // onWalletChange,
    forMobileView,
    chainData: switchForWallet === "Bitcoin" ? "Bitcoin" : "Slup",
  }));
  //===============================End Of Code==================================//

  //===============================Code For Header Scroll==================================//
  const controlNavbar = () => {
    if (window.scrollY) {
      document.getElementById("headerId").classList.add("darker-header");
    }
    if (window.scrollY == 0) {
      document.getElementById("headerId").classList.remove("darker-header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);
  //===============================End Of Code==================================//

  const handleLinkClose = () => {
    setShowLinkModel(false);
  };
  const HandelAddress = (e) => {
    setAddressLink({ ...addressLink, [e.target.name]: e.target.value });
  };

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

  //===============================Link Address Code==================================//
  const linkAddressFunction = async () => {
    if (
      !addressLink?.nativeAddress ||
      !addressLink?.nestedAddress ||
      !addressLink?.taprootAddress ||
      !addressLink?.legacyAddress
    ) {
      toast.warn("Please fill all details");
    } else {
      let checkObj = {
        NestedCheck: false,
        NativeCheck: false,
        TaprootCheck: false,
        LegacyCheck: false,
      };
      const RowNetworkType = await encryptData(WalletBTC?.network);

      const RowAddressNative = await encryptData(addressLink?.nativeAddress);
      const RowAddressNested = await encryptData(addressLink?.nestedAddress);
      const RowAddressTaproot = await encryptData(addressLink?.taprootAddress);
      const RowAddressLegacy = await encryptData(addressLink?.legacyAddress);
      const checkNativeAddress = await axiosBack.post(
        "/signature/check-address",
        {
          address: RowAddressNative,
          networkType: RowNetworkType,
        }
      );
      if (checkNativeAddress?.data?.data?.type === "witnesspubkeyhash") {
        setCheckForTrueAddressNative(true);
        checkObj = { ...checkObj, NativeCheck: true };
      } else {
        setCheckForTrueAddressNative(false);
        checkObj = { ...checkObj, NativeCheck: false };
      }
      const checkNestedAddress = await axiosBack.post(
        "/signature/check-address",
        {
          address: RowAddressNested,
          networkType: RowNetworkType,
        }
      );
      if (checkNestedAddress?.data?.data?.type === "scripthash") {
        setCheckForTrueAddressNested(true);
        checkObj = { ...checkObj, NestedCheck: true };
      } else {
        setCheckForTrueAddressNested(false);
        checkObj = { ...checkObj, NestedCheck: false };
      }
      const checkTaprootAddress = await axiosBack.post(
        "/signature/check-address",
        {
          address: RowAddressTaproot,
          networkType: RowNetworkType,
        }
      );
      if (checkTaprootAddress?.data?.data?.type === "taproot") {
        setCheckForTrueAddressTaproot(true);
        checkObj = { ...checkObj, TaprootCheck: true };
      } else {
        setCheckForTrueAddressTaproot(false);
        checkObj = { ...checkObj, TaprootCheck: false };
      }
      const checkLegacyAddress = await axiosBack.post(
        "/signature/check-address",
        {
          address: RowAddressLegacy,
          networkType: RowNetworkType,
        }
      );

      if (checkLegacyAddress?.data?.data?.type === "pubkeyhash") {
        setCheckForTrueAddressLegacy(true);
        checkObj = { ...checkObj, LegacyCheck: true };
      } else {
        setCheckForTrueAddressLegacy(false);
        checkObj = { ...checkObj, LegacyCheck: false };
      }

      if (!checkObj?.NativeCheck) {
        toast.warn("Please enter valid native address");
      } else if (!checkObj?.NestedCheck) {
        toast.warn("Please enter valid nested address");
      } else if (!checkObj?.TaprootCheck) {
        toast.warn("Please enter valid taproot address");
      } else if (!checkObj?.LegacyCheck) {
        toast.warn("Please enter valid legacy address");
      } else {
        setDisableLink(true);
        try {
          const linkPayload = {
            type: WalletEVM?.type,
            nativeAddress: addressLink.nativeAddress,
            nestedAddress: addressLink.nestedAddress,
            taprootAddress: addressLink.taprootAddress,
            legacyAddress: addressLink.legacyAddress,
            chainId: WalletEVM.chainId,
          };
          const LinkAddress = await linkAddress(linkPayload);
          if (LinkAddress) {
            setDisableLink(false);
            toast.success("Address link successfully");
            setAddressLink({
              nativeAddress: "",
              nestedAddress: "",
              taprootAddress: "",
              legacyAddress: "",
            });
            handleLinkClose();
          }
        } catch (err) {
          setDisableLink(false);
        }
      }
    }
  };
  //===============================End Of Code==================================//

  const logoutBTC = async () => {
    dispatch(setBitcoinWallet({}));
  };
  const logoutEVM = async () => {
    try {
      const disconnect = await onDisconnect();
      dispatch(setEVMWallet({}));
    } catch (err) {}
  };

  return (
    <>
      <header className="main-header" id="headerId">
        <Container>
          <Row className="">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="/">
                  <img src="assets/images/logo.png" />
                </Navbar.Brand>

                <Navbar>
                  {!WalletEVM?.selectedAccount ? (
                    <button
                      onClick={() => {
                        setShow(true);
                        setSwitchForWallet("Slup");
                      }}
                      className=" common-btn"
                    >
                      Connect EVM Wallet
                    </button>
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle
                        className="common-btn"
                        id="dropdown-basic"
                      >
                        <img
                          src={
                            WalletEVM?.type === "metamask"
                              ? "assets/images/metamask.svg"
                              : WalletEVM?.type === "walletConnect"
                              ? "assets/images/walletconnect.svg"
                              : "assets/images/coinbase.webp"
                          }
                          alt=""
                        />
                        {WalletEVM?.selectedAccount.replace(
                          WalletEVM?.selectedAccount.substring(5, 37),
                          "..."
                        )}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            logoutEVM();
                          }}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    // <button className="ms-auto common-btn">
                    //   {WalletEVM?.selectedAccount.replace(
                    //     WalletEVM?.selectedAccount.substring(5, 37),
                    //     "..."
                    //   )}
                    // </button>
                  )}

                  {!WalletBTC?.selectedAccount ? (
                    <button
                      className=" common-btn"
                      onClick={() => {
                        setShow(true);
                        setSwitchForWallet("Bitcoin");
                      }}
                    >
                      Connect BTC Wallet
                    </button>
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle
                        className="common-btn"
                        id="dropdown-basic"
                      >
                        <img
                          src={
                            WalletBTC?.type === "unisat"
                              ? "assets/images/unisat.jpg"
                              : "assets/images/slup.png"
                          }
                          alt=""
                        />
                        {WalletBTC?.selectedAccount.replace(
                          WalletBTC?.selectedAccount.substring(5, 37),
                          "..."
                        )}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            logoutBTC();
                          }}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    // <button className="ms-auto common-btn">
                    //   {WalletBTC?.selectedAccount.replace(
                    //     WalletBTC?.selectedAccount.substring(5, 37),
                    //     "..."
                    //   )}
                    // </button>
                  )}
                  <button
                    className="ms-auto common-btn"
                    onClick={() => {
                      if (
                        !WalletBTC?.selectedAccount ||
                        !WalletEVM?.selectedAccount
                      ) {
                        toast.warn("Please connect your both wallets");
                      } else {
                        setShowLinkModel(true);
                      }
                    }}
                  >
                    Link Address
                  </button>
                </Navbar>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <Modal
        show={showLinkModel}
        onHide={handleLinkClose}
        centered
        className="transaction-proceed-modal link-address-modal"
        backdrop="static"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Connect Wallet</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="heading-box">
            <h4>Link your address</h4>
            <p>Transaction status can also be tracked in Recent Trades</p>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Native Segwit</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter native segwit address"
                name="nativeAddress"
                onChange={HandelAddress}
                value={addressLink.nativeAddress}
              />
              <InputGroup.Text
                className={checkForTrueAddressNative === true ? "check" : ""}
              >
                {/* <i class="fa fa-check" aria-hidden="true"></i> */}
                {checkForTrueAddressNative === true ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  // <i class="fa fa-times" aria-hidden="true"></i>
                  ""
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nested Segwit</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter nested segwit address"
                name="nestedAddress"
                onChange={HandelAddress}
                value={addressLink.nestedAddress}
              />
              <InputGroup.Text
                className={checkForTrueAddressNested === true ? "check" : ""}
              >
                {checkForTrueAddressNested === true ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  ""
                  // <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Taproot</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter taproot address"
                name="taprootAddress"
                onChange={HandelAddress}
                value={addressLink.taprootAddress}
              />
              <InputGroup.Text
                className={checkForTrueAddressTaproot === true ? "check" : ""}
              >
                {checkForTrueAddressTaproot === true ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  ""
                  // <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Legacy</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter legacy address"
                name="legacyAddress"
                onChange={HandelAddress}
                value={addressLink.legacyAddress}
              />
              <InputGroup.Text
                className={checkForTrueAddressLegacy === true ? "check" : ""}
              >
                {checkForTrueAddressLegacy === true ? (
                  <i class="fa fa-check" aria-hidden="true"></i>
                ) : (
                  ""
                  // <i class="fa fa-times" aria-hidden="true"></i>
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <div className="swap-row">
            <button
              className="common-btn w-100 p-3"
              onClick={() => {
                linkAddressFunction();
              }}
              disabled={disableLink}
            >
              {disableLink === true ? "Processing" : "Link now"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <ConnectWalletModal {...ConnectWalletModalProps} />
    </>
  );
}
