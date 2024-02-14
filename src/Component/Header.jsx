import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Connect } from "../helpers/Connect";
import { useDispatch } from "react-redux";
import { setEVMWallet } from "../store/reducers/authReducer";

export default function Header(props) {
  const dispatch = useDispatch();
  const { WalletEVM } = useAuth();
  const [show, setShow] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
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
    // onWalletChange,
    forMobileView,
    chainData: props.chainSelect,
  }));
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
                      }}
                      className="ms-auto common-btn"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <button className="ms-auto common-btn">
                      {WalletEVM?.selectedAccount.replace(
                        WalletEVM?.selectedAccount.substring(5, 37),
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
