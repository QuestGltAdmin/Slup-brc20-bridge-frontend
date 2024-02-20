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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ConnectWalletModal from "./ui/ConnectWalletModal";
import useAuth from "../hooks/useAuth";
import { Connect } from "../helpers/Connect";
import { useDispatch } from "react-redux";
import { setEVMWallet } from "../store/reducers/authReducer";
import { toast } from "react-toastify";
import { linkAddress } from "../helpers/linkAddress";
import { checkAddressType } from "../btcHelper/btcAddressCheck";

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

  const linkAddressFunction = async () => {
    const checkNativeAddress = await checkAddressType(
      addressLink.nativeAddress,
      WalletBTC.network
    );
    const checkTaprootAddress = await checkAddressType(
      addressLink.taprootAddress,
      WalletBTC.network
    );
    if (!checkNativeAddress) {
      toast.warn("Please enter valid native address");
    } else if (!checkTaprootAddress) {
      toast.warn("Please enter valid taproot address");
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
        console.log(LinkAddress);
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
  };

  return (
    <>
      <header className="main-header" id="headerId">
        <Navbar expand="lg" sticky="top">
          <Container>
            <Row className="w-100">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Navbar.Brand href="/">
                    <img src="assets/images/logo.png" />
                  </Navbar.Brand>

                  {!WalletEVM?.selectedAccount ? (
                    <button
                      onClick={() => {
                        setShow(true);
                        setSwitchForWallet("Slup");
                      }}
                      className="ms-auto common-btn"
                    >
                      Connect EVM Wallet
                    </button>
                  ) : (
                    <button className="ms-auto common-btn">
                      {WalletEVM?.selectedAccount.replace(
                        WalletEVM?.selectedAccount.substring(5, 37),
                        "..."
                      )}
                    </button>
                  )}

                  {!WalletBTC?.selectedAccount ? (
                    <button
                      className="ms-auto common-btn"
                      onClick={() => {
                        setShow(true);
                        setSwitchForWallet("Bitcoin");
                      }}
                    >
                      Connect BTC Wallet
                    </button>
                  ) : (
                    <button className="ms-auto common-btn">
                      {WalletBTC?.selectedAccount.replace(
                        WalletBTC?.selectedAccount.substring(5, 37),
                        "..."
                      )}
                    </button>
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
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
      <Modal
        show={showLinkModel}
        onHide={handleLinkClose}
        centered
        className="transaction-proceed-modal"
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
            <Form.Control
              type="text"
              placeholder="Enter native segwit address"
              name="nativeAddress"
              onChange={HandelAddress}
              value={addressLink.nativeAddress}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nested Segwit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter nested segwit address"
              name="nestedAddress"
              onChange={HandelAddress}
              value={addressLink.nestedAddress}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Taproot</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter taproot address"
              name="taprootAddress"
              onChange={HandelAddress}
              value={addressLink.taprootAddress}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Legacy</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter legacy address"
              name="legacyAddress"
              onChange={HandelAddress}
              value={addressLink.legacyAddress}
            />
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
