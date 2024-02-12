import React, { useCallback, useMemo, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Col,
  Row,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ConnectWalletModal from "./ui/ConnectWalletModal";
import useAuth from "../hooks/useAuth";

export default function Header(props, { onWalletChange }) {
  const { walletAddress } = useAuth();
  console.log("walletAddress", walletAddress);
  const [show, setShow] = useState(false);
  const [forMobileView, setForMobileView] = useState(
    window.innerWidth < 992 ? true : false
  );
  const handleClose = useCallback((e) => {
    setShow(false);
  });
  const ConnectWalletModalProps = useMemo(() => ({
    modalProps: {
      show: show,
      onHide: handleClose,
    },
    onWalletChange,
    forMobileView,
    chainData: props.chainSelect,
  }));
  return (
    <>
      <header className="main-header">
        <Navbar expand="lg" sticky="top">
          <Container>
            <Row className="w-100">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Navbar.Brand href="/">
                    <img src="assets/images/logo.png" />
                  </Navbar.Brand>

                  {!walletAddress.selectedAccount ? (
                    <button
                      onClick={() => {
                        setShow(true);
                      }}
                      className="ms-auto common-btn"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <button className="ms-auto common-btn">
                      {walletAddress.selectedAccount.replace(
                        walletAddress.selectedAccount.substring(5, 37),
                        "..."
                      )}
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
      <ConnectWalletModal {...ConnectWalletModalProps} />
    </>
  );
}
