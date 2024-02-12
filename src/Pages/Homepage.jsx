import React, { useState } from 'react'
import Layout from '../Component/Layout'
import { Container, Row, Col, Dropdown, Form, Modal, Button } from 'react-bootstrap'

export const Homepage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Layout chainSelect="Bitcoin">
            <section className="swap-main-sec">
                <Container>
                  <Row className="align-items-center">
                     <Col lg={5} md={12}>
                        <div className="outer-token-informations">
                            <h3>Token Information</h3>
                            <div className="token-with-price">
                               <p><img src="assets/images/MUBI.png" alt="" className="token-img" /> MUBI</p>
                               <p>$0.108725 <img src="assets/images/price.png" alt="" className="amount-side" /></p>
                            </div>
                            <h6>Existing cross-chain amount <span>BRC-20</span></h6>
                            <h2>912,408,210.38</h2>
                            <div className="slup-address-copy">
                               <p>Slup chain address</p>
                               <p>0x38...DE93 
                                <a href=""><img src="assets/images/copy.png" alt="" /></a>
                                <a href=""><img src="assets/images/download.png" alt="" /></a></p>
                            </div>
                            <Dropdown className="dropdown-cross-chain-step">
                              <Dropdown.Toggle className="common-btn" id="dropdown-basic">
                              CROSS CHAIN STEPS
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                  <div>
                                      <h3>Cross-chain from bitcoin to EVM</h3>
                                      <p>Connect Bitcoin wallet.Select the ETH or BNB chain, enter the receiving address on the EVM chain,wait for 3-4 blocks, and after minting is successful, tokens are successfully bridged over to the EVM network.</p>
                                  </div>
                                  <div>
                                      <h3>Cross-chain from bitcoin to EVM</h3>
                                      <p>Connect Bitcoin wallet.Select the ETH or BNB chain, enter the receiving address on the EVM chain,wait for 3-4 blocks, and after minting is successful, tokens are successfully bridged over to the EVM network.</p>
                                  </div>
                                  <div>
                                      <h3>Cross-chain from bitcoin to EVM</h3>
                                      <p>Connect Bitcoin wallet.Select the ETH or BNB chain, enter the receiving address on the EVM chain,wait for 3-4 blocks, and after minting is successful, tokens are successfully bridged over to the EVM network.</p>
                                  </div>
                                  <div>
                                    <a href="" className="view-all-btn">View All</a>
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
                                  <Dropdown>
                                    <Dropdown.Toggle className="" id="dropdown-basic">
                                    <img src="assets/images/bitcoin.png" alt="" />  
                                    Bitcoin
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                            </div>
                            <div className="text-center">
                              <a href="" className="swap-btn"><img src="assets/images/swap.png" alt="" /> </a>
                            </div>
                            <Row>
                              <Col md="6">
                                  <div className="swap-currency-drop">
                                    <p>From</p>
                                      <Dropdown>
                                        <Dropdown.Toggle className="" id="dropdown-basic">
                                        <img src="assets/images/slup.png" alt="" />  
                                        Bitcoin
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                </div>
                              </Col>
                              <Col md="6">
                                  <div className="swap-currency-drop">
                                    <p>From</p>
                                      <Dropdown>
                                        <Dropdown.Toggle className="" id="dropdown-basic">
                                        <img src="assets/images/MUBI.png" alt="" />  
                                        Bitcoin
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                </div>
                              </Col>
                            </Row>

                            <div className="available-balance">
                                <p>Available on BSC <b>0.0 MUBI</b></p>
                            </div>


                            <div className="swap-currency-drop swap-enter-amount">
                                 <p>Amount</p>
                                 <Form.Control
                                  type="text"
                                  placeholder="0"
                                  value={"0"}
                                />
                                <button className="common-btn">Max</button>
                            </div>


                            <div className="service-charge-box">
                                <p><img src="assets/images/plugin.png" alt="" className="service-icon" /> Service fees: 0.03 BNB <a href=""><img src="assets/images/info.png" alt="" /></a></p>
                                <p className="receive-amount">You will receive <span>0 MUBI</span> <span className="brc-highlight">BRC 20</span></p>
                            </div>


                            <div className="swap-currency-drop swap-enter-amount">
                                 
                                 <Form.Control
                                  type="text"
                                  placeholder="Enter BRC-20 Recipient Address"
                                />
                                
                            </div>






                            <div className="checkbox-agree">
                               <Form.Check aria-label="" label="I have learned that service is only available to non-U.S. persons and entities." />
                            </div>

                            <div>
                              <button className="common-btn w-100 p-3"  onClick={handleShow}>TRANSFER</button>
                            </div>

                            <div className="new-user-note">
                              <h6>Estimated 3 blocks to confirm.</h6>
                              <h5>I don't have a wallet plug-in, <a href="">HD Wallet Mode →</a></h5>
                            </div>



                        </div>
                     </Col>
                  </Row>
                </Container>
            </section>

            <Modal show={show} onHide={handleClose} centered className="transaction-proceed-modal">
              <Modal.Body >
                  <div className="heading-box">
                    <h4>Your Transaction is Being Process</h4>
                    <p>Transaction status can also be tracked in Recent Trades</p>
                  </div>
                  <div className="swap-row">
                      <div>
                         <img src="assets/images/MUBI.png" alt="" className="" />
                         <div>
                            <h4>MUBI</h4>
                            <p>mubi</p>
                         </div>
                      </div>
                      <img src="assets/images/Arrow.png" alt="" className="arrow-img" />
                      <div>
                         <img src="assets/images/MUBI.png" alt="" className="" />
                         <div>
                            <h4>MUBI</h4>
                            <p>mubi</p>
                         </div>
                      </div>
                  </div>
                  <div className="currency-transfer-loading">
                      <div>
                          <img src="assets/images/loader.gif" alt="" className="loader-ing" />
                          <img src="assets/images/bitcoin.png" alt="" className="coin-img" />
                          <span>BTC</span>
                      </div> 
                      <div>
                          <img src="assets/images/loader.gif" alt="" className="loader-ing" />
                          <img src="assets/images/bitcoin.png" alt="" className="coin-img" />
                          <span>BTC</span>
                      </div>
                      <div>
                          <img src="assets/images/loader.gif" alt="" className="loader-ing" />
                          <img src="assets/images/slup.png" alt="" className="coin-img" />
                          <span>Slup</span>
                      </div> 
                  </div>
                  <p>If your transaction seems to be taking longer than normal (more than 30 mins). Please contact our Support Team at Support@slup.com</p>
              </Modal.Body>
            </Modal>

      </Layout>
    </>
  )
}
