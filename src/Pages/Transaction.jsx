import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { Col, Container, Modal, Row, Table } from "react-bootstrap";
import { encryptData } from "../helpers/encryption";
import useAuth from "../hooks/useAuth";
import axiosBack from "../http/axios/axios_Back";
import moment from "moment";
import { toast } from "react-toastify";
import { MintBrc20 } from "../helpers/mintbrc20";

export const Transaction = () => {
  //===============================Global Variables==================================//
  const { WalletBTC, WalletEVM } = useAuth();
  //===============================End Of Code==================================//

  //===============================Local Variables==================================//
  const [showData, setShowData] = useState([]);
  const [disableClaim, setDisableClaim] = useState(false);
  const [voucherData, setVoucherData] = useState([]);
  const [showClamModel, setShowClamModel] = useState(false);
  //===============================End Of Code==================================//

  //===============================Handel Model Data==================================//
  const handleClamClose = () => {
    setShowClamModel(false);
  };
  //===============================End Of Code==================================//

  //===============================Get Table Data==================================//
  const getData = async () => {
    const RowEvmAddress = await encryptData(WalletEVM?.selectedAccount);
    const payload = {
      evmAddress: RowEvmAddress,
    };
    try {
      const getUserData = await axiosBack.post(
        "/signature/get-signature",
        payload
      );
      console.log(getUserData);
      if (getUserData?.data?.status) {
        setShowData(getUserData?.data?.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (WalletEVM?.selectedAccount) {
      getData();
    }
  }, [WalletEVM?.selectedAccount]);
  //===============================End Of Code==================================//

  //===============================Model Save Data to state==================================//
  const modelOpenFun = (e) => {
    setVoucherData(e);
    setShowClamModel(true);
  };
  //===============================End Of Code==================================//

  //===============================Claim Amount Function=================================//
  const claimFunction = async () => {
    setDisableClaim(true);
    try {
      const payload = {
        v: voucherData.v,
        r: voucherData.r,
        s: voucherData.s,
        userAddress: voucherData?.voucher?.evmAddress,
        amount: voucherData?.voucher?.amount,
        brcToken: voucherData?.voucher?.brcTokenAddress,
        timeStamp: voucherData?.voucher?.timeStamp,
        type: WalletEVM.type,
        chainId: WalletEVM.chainId,
      };
      const claimData = await MintBrc20(payload);
      if (claimData) {
        try {
          const RowSignatureId = await encryptData(voucherData._id);
          const RowEVMAddress = await encryptData(
            voucherData?.voucher?.evmAddress
          );
          const RowTransactionHash = await encryptData(
            claimData?.transactionHash
          );
          const apiPayload = {
            signatureId: RowSignatureId,
            evmAddress: RowEVMAddress,
            transactionHash: RowTransactionHash,
          };

          const updateRes = await axiosBack.post(
            "/signature/update-signature",
            apiPayload
          );
          if (updateRes?.data?.status) {
            setDisableClaim(false);
            getData();
            handleClamClose();
            toast.success("Amount claimed successfully");
          }
        } catch (err) {
          toast.error(err.response.data.message);
        }
      } else {
        setDisableClaim(false);
      }
    } catch (err) {
      setDisableClaim(false);
    }
  };
  //===============================End Of Code==================================//
  return (
    <>
      <Layout>
        <section className="transactions-sec">
          <Container>
            <Row>
              <Col>
                <h2>Transactions</h2>
                <div className="table-responsive table-outer-box">
                  <Table className="table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>BTC Address</th>
                        <th>Slup Address</th>
                        <th>BTC Amount</th>
                        <th>Slup Amount</th>
                        <th>Date</th>
                        <th>Token Symbol</th>
                        <th>Trx Hash</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showData?.length > 0 ? (
                        showData.map((items, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <a
                                  href={`https://mempool.space/testnet/address/${items.btcWalletAddress}`}
                                  target="_blank"
                                >
                                  {items.btcWalletAddress.replace(
                                    items.btcWalletAddress.substring(5, 37),
                                    "..."
                                  )}
                                </a>
                              </td>
                              <td>
                                <a
                                  href={`https://testnet.bscscan.com/address/${items?.voucher?.evmAddress}`}
                                  target="_blank"
                                >
                                  {items?.voucher?.evmAddress.replace(
                                    items?.voucher?.evmAddress.substring(5, 37),
                                    "..."
                                  )}
                                </a>
                              </td>
                              <td>{(items.btcAmount * 1).toFixed(2)}</td>
                              <td>
                                {(items?.voucher?.amount / 1e18).toFixed(2)}
                              </td>
                              <td>{moment(items.createdAt).format("lll")}</td>
                              <td>{items?.brcTokenSymbol}</td>
                              <td>
                                {items?.transactionHash ? (
                                  <a
                                    href={`https://testnet.bscscan.com/tx/${items?.transactionHash}`}
                                    target="_blank"
                                  >
                                    {" "}
                                    {items?.transactionHash?.replace(
                                      items?.transactionHash?.substring(5, 61),
                                      "..."
                                    )}
                                  </a>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>
                                <b
                                  className={
                                    items.status === "SUCCESS"
                                      ? "success"
                                      : "pending"
                                  }
                                >
                                  {items.status}
                                </b>
                              </td>

                              <td>
                                {items?.status === "SUCCESS" ? (
                                  <button className="common-btn disable">
                                    Claimed
                                  </button>
                                ) : (
                                  <button
                                    className="common-btn"
                                    onClick={() => {
                                      modelOpenFun(items);
                                    }}
                                  >
                                    Claim
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={10}>
                            <p className="text-center">No Data Found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
      <Modal
        show={showClamModel}
        onHide={handleClamClose}
        centered
        className="transaction-proceed-modal"
        backdrop="static"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Connect Wallet</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="heading-box">
            <h4>Clam Your Amount</h4>
            <p>
              BTC Address{" "}
              {voucherData?.btcWalletAddress?.replace(
                voucherData?.btcWalletAddress?.substring(5, 37),
                "..."
              )}{" "}
              -- Slup Address{" "}
              {voucherData?.voucher?.evmAddress?.replace(
                voucherData?.voucher?.evmAddress?.substring(5, 37),
                "..."
              )}
            </p>
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
    </>
  );
};
