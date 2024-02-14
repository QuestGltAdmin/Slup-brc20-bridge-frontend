import React, { useState } from "react";
import { Col, Container, Row, Modal, Navbar, Button } from "react-bootstrap";
import { Connect } from "../../helpers/Connect";
import { useDispatch } from "react-redux";
import {
  setBitcoinWallet,
  setEVMWallet,
} from "../../store/reducers/authReducer";
import { connectUnisat } from "../../btcHelper/connectWallet";

export default function ConnectWalletModal({
  forMobileView,
  chainData,
  ...props
}) {
  const dispatch = useDispatch();
  const connect = async (type) => {
    try {
      props.modalProps.onHide();
      const wallet = await Connect(type);
      if (type === "walletConnect") {
        document.addEventListener("ACCOUNT_CONNECTED", (e) => {
          dispatch(setEVMWallet(e.detail));
        });

        dispatch(setEVMWallet(wallet));
      } else {
        dispatch(setEVMWallet(wallet));
      }
    } catch (err) {
      console.log("Connect Wallet: ", err);
    }
  };

  const connectUnisatWallet = async (type) => {
    try {
      const walletData = await connectUnisat(type);
      const payload = {
        selectedAccount: walletData?.account[0],
        network: walletData?.network,
        type: type,
      };
      if (walletData) {
        dispatch(setBitcoinWallet(payload));
      }
    } catch (err) {}
  };

  return (
    <Modal
      className="token-list-modal connect-wallet-modal"
      centered
      size="lg"
      {...props.modalProps}
    >
      <Modal.Header closeButton>
        <Modal.Title>Connect Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chainData === "Bitcoin" ? (
          <div className="connect-tech-div">
            <Button
              className="common-btn"
              onClick={() => connectUnisatWallet("unisat")}
            >
              Unisat <img src="assets/images/unisat.jpg" />
            </Button>

            <Button className="common-btn" onClick={() => connect("Coinbase")}>
              Slup Wallet <img src="assets/images/slup.png" />
            </Button>
          </div>
        ) : (
          <>
            <div className="connect-tech-div">
              {forMobileView === false ? (
                <Button
                  className="common-btn"
                  onClick={() => connect("metamask")}
                >
                  Metamask <img src="assets/images/metamask.svg" />
                </Button>
              ) : (
                ""
              )}
              {/* <Button onClick={() => connect("metamask")}>TronLink <img src="assets/img/tronlink.webp" /></Button> */}
              {/* <Button onClick={() => connect("metamask")}>BitKeep <img src="assets/img/bitkeep.svg" /></Button> */}
              {forMobileView === false ? (
                <Button
                  className="common-btn"
                  onClick={() => connect("Coinbase")}
                >
                  Coinbase Wallet <img src="assets/images/coinbase.webp" />
                </Button>
              ) : (
                ""
              )}
              <Button
                className="common-btn"
                onClick={() => connect("walletConnect")}
              >
                WalletConnect <img src="assets/images/walletconnect.svg" />
              </Button>
            </div>
            <p className="learnmore-link">
              New to Ethereum?{" "}
              <a href="https://ethereum.org/en/wallets/" target={"_blank"}>
                Learn more about wallets →
              </a>
            </p>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
