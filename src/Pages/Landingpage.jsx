import React, { useState } from "react";
import { Container, Col, Row, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Landingpage = () => {
  const navigate = useNavigate()
  const [menuCheck, setMenuCheck] = useState(false);
  const addClassOnClick = () => {
    setMenuCheck(true);
  };
  const removeClassOnClick = () => {
    setMenuCheck(false);
  };
  return (
    <>
      <div className="outer-div-home">
        <section className="outer-banner-sec">
          <Container>
            <Row>
              <Col lg={6}>
                <div data-aos="fade-right">
                  <p>Introducing SLUP,</p>
                  <h2>The Value Layer of the Internet.</h2>
                  <ul>
                    <li>
                      <h4>Build</h4>
                      <p>Get access to our documents, and start building.</p>
                      <p className="redirection-link">
                        <a href="">
                          <img src="assets/images/home/arrow.png" alt="" />
                        </a>
                      </p>
                    </li>
                    <li>
                      <h4>Stake</h4>
                      <p>
                        Participate in securing the network by delegating MATIC
                        tokens.
                      </p>
                      <p className="redirection-link">
                        <a href="">
                          <img src="assets/images/home/arrow.png" alt="" />
                        </a>
                      </p>
                    </li>
                    <li>
                      <h4>Use SLUP</h4>
                      <p>Bridge, Swap and Manage your assets on Slup.</p>
                      <p className="redirection-link">
                        <a href="">
                          <img src="assets/images/home/arrow.png" alt="" />
                        </a>
                      </p>
                    </li>
                    <li>
                      <h4>Launch</h4>
                      <p>Bridge, Swap and Manage your assets on Slup.</p>
                      <p className="redirection-link">
                        <a href="">
                          <img src="assets/images/home/arrow.png" alt="" />
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={6}>
                <div className="outer-box-banner-right">
                  <div className="right-img-box">
                    <div>
                      <img
                        src="assets/images/home/banner-img.gif"
                        className="img-fluid banner-img"
                        alt=""
                      />
                    </div>
                    <div className="social-icon" data-aos="fade-left">
                      <a href="">
                        <img src="assets/images/home/Social1.png" alt="" />
                      </a>
                      <a href="">
                        <img src="assets/images/home/Social2.png" alt="" />
                      </a>
                      <a href="">
                        <img src="assets/images/home/Social3.png" alt="" />
                      </a>
                      <a href="">
                        <img src="assets/images/home/Social4.png" alt="" />
                      </a>
                    </div>
                  </div>
                  <p data-aos="fade-up">
                    The fundamental protocol that allows anyone to create and
                    exchange value, powered by zero-knowledge technology.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="about-slup-sec">
          <Container>
            <Row>
              <Col lg={4}>
                <div className="common-heading" data-aos="fade-right">
                  <h2>About SLUP</h2>
                  <h5>Innovation at Your Fingertips</h5>
                </div>
              </Col>
              <Col lg={4} md={6}>
                <div className="about-box" data-aos="fade-up">
                  <img src="assets/images/home/coin-about1.png" alt="" />
                  <p>
                    SLUP activates a beacon of innovation, making it a seamless
                    crypto experience for the nerds, classes, and masses. We
                    take pride in launching the first mobile-based wallet app in
                    the entire BRC-20 ecosystem.
                  </p>
                  <a href="" className="border-btn">
                    Learn more
                  </a>
                </div>
              </Col>
              <Col lg={4} md={6}>
                <div className="about-box pink-bg" data-aos="fade-left">
                  <img src="assets/images/home/coin-about2.png" alt="" />
                  <p>
                    SLUP not only makes the swap experience seamless but also
                    makes it possible to wave “hello” to other chains.
                    Therefore, it becomes a robust multi-chain powerhouse that
                    ought to be on your devices.
                  </p>
                  <a href="" className="border-btn">
                    Learn more
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="download-add-sec">
          <Container>
            <Row>
              <Col lg={5} data-aos="fade-right">
                <div className="common-heading">
                  <h5>
                    Tired of juggling multiple wallets for different tokens?
                  </h5>
                  <h2>Introducing the all new SLUP Wallet App</h2>
                </div>
                <div className="download-box">
                  <p>Download the SLUP wallet app now!</p>
                  <div>
                    <a href="">
                      <img src="assets/images/home/App-Store.png" alt="" />
                    </a>
                    <a href="">
                      <img src="assets/images/home/Play-Store.png" alt="" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col lg={7}>
                <div className="outer-download">
                  <div className="mobile-img-box" data-aos="fade-up">
                    <img
                      src="assets/images/home/mobile.png"
                      className="mobile-img"
                      alt=""
                    />
                    <div className="circular-img-outer">
                      <img
                        src="assets/images/home/App-circle.png"
                        className="circular-img"
                        alt=""
                      />
                      <img
                        src="assets/images/home/arrow-big.png"
                        className="arrow-img"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="outer-box-info-download" data-aos="fade-left">
                    <div>
                      <h3>12k+</h3>
                      <p>Downloads and couting...</p>
                    </div>
                    <div>
                      <h3>#1</h3>
                      <p>Top rated app in finance category</p>
                    </div>
                    <h6>
                      Introducing the revolutionary BRC-20 based mobile wallet
                      app, designed to streamline your experience and empower
                      you with complete control.
                    </h6>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="why-choose-sec">
          <Container>
            <Row>
              <Col lg={11} md={12} className="m-auto">
                <div className="outer-why-choose">
                  <div className="why-choose-heading">
                    <h2 data-aos="fade-up">Why Choose SLUP?</h2>
                    <p data-aos="fade-up">
                      SLUP not only makes the swap experience seamless but also
                      makes it possible to wave “hello” to other chains.
                      Therefore, it becomes a robust multi-chain powerhouse that
                      ought to be on your devices.
                    </p>
                  </div>
                  <Row className="m-0">
                    <Col lg={4} md={4} className="p-0">
                      <div className="why-choose-box" data-aos="fade-right">
                        <img src="assets/images/home/why1.png" alt="" />
                        <h4>Providing unparalleled security</h4>
                        <h6>Mobile Security, Redefined</h6>
                        <p>
                          App-based security: With our mobile wallet, you can
                          keep your assets safe even when you're on the go
                          thanks to cutting-edge security features.
                        </p>
                        <p>
                          Regular Monitoring and Updates: To safeguard against
                          evolving threats, we keep our mobile platform updated
                          and vigilantly monitored.
                        </p>
                      </div>
                    </Col>
                    <Col lg={4} md={4} className="p-0">
                      <div className="why-choose-box" data-aos="fade-up">
                        <img src="assets/images/home/why2.png" alt="" />
                        <h4>
                          Seamless <br /> Interoperability
                        </h4>
                        <h6>The Crypto World in Your Pocket</h6>
                        <p>
                          Easy Multi-Chain Access: Enjoy seamless multi-chain
                          swaps with the first BRC-20 mobile platform.
                        </p>
                        <p>
                          Seamless Mobile Interface: With our user-friendly
                          mobile app, crypto swaps become simple and accessible.
                        </p>
                      </div>
                    </Col>
                    <Col lg={4} md={4} className="p-0">
                      <div className="why-choose-box" data-aos="fade-left">
                        <img src="assets/images/home/why3.png" alt="" />
                        <h4>
                          Transparent <br /> Operations
                        </h4>
                        <h6>Clarity at Every Step</h6>
                        <p>
                          Transparent Mobile Transactions: With our mobile
                          wallet, every transaction is transparently recorded,
                          giving you peace of mind and complete visibility.
                        </p>
                        <p>
                          Real-Time Notifications: Receive real-time updates and
                          notifications directly on your mobile device.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="roadmap-sec">
          <Container>
            <Row>
              <Col lg={4} md={4}>
                <div className="roadmap-heading">
                  <div className="common-heading" data-aos="fade-right">
                    <h2>Roadmap</h2>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} className="ms-auto">
                <ul className="timeline-outer" data-aos="fade-up">
                  <li className="timeline-single green-active">
                    <div className="dot-scroll"></div>
                    <h4>Jan 2024</h4>
                    <ul>
                      <li>Activated Minting</li>
                      <li>Listed on Unisat/Ordinal</li>
                      <li>SLUP Wallet UI Preview</li>
                      <li>Layer-2 Blockchain Production Announcement</li>
                    </ul>
                  </li>
                  <li className="timeline-single">
                    <div className="dot-scroll"></div>
                    <h4>Feb 2024</h4>
                    <ul>
                      <li>SLUP Wallet Testnet Release</li>
                      <li>SLUP Wallet Mainnet Launch</li>
                    </ul>
                  </li>
                  <li className="timeline-single">
                    <div className="dot-scroll"></div>
                    <h4>Mar 2024</h4>
                    <ul>
                      <li>Layer-2 Blockchain Testnet</li>
                      <li>Layer-2 SLUP Chain Mainnet Launch</li>
                      <li>SLUPScan Launch (Explorer)</li>
                    </ul>
                  </li>
                  <li className="timeline-single">
                    <div className="dot-scroll"></div>
                    <h4>Apr 2024</h4>
                    <ul>
                      <li>SLUP Cross-chain bridge launch</li>
                      <li>SLUP Dex Launch (self-chain)</li>
                    </ul>
                  </li>
                  <li className="timeline-single">
                    <div className="dot-scroll"></div>
                    <h4>May 2024</h4>
                    <ul>
                      <li>Enable projects to launch tokens on SLUP</li>
                      <li>SLUP IDO Platform Launch</li>
                      <li>Listing of SLUP on CEX</li>
                    </ul>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="last-join-sec">
          <Container>
            <Row>
              <Col lg={10} className="m-auto">
                <div
                  className="common-heading text-center"
                  data-aos="fade-left"
                >
                  <h6>SLUP: Your Mobile Gateway to the Crypto World</h6>
                  <h2>
                    Join the SLUP community and be a part of the mobile
                    revolution in the BRC-20 ecosystem.
                  </h2>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="footer-landing-page">
          <Container>
            <Row>
              <Col lg={10} className="m-auto">
                <div className="text-center" data-aos="fade-right">
                  <h6>Follow us on for the latest updates and insights:</h6>
                  <div className="social-icon">
                    <a href="">
                      <img src="assets/images/home/Social1.png" alt="" />
                    </a>
                    <a href="">
                      <img src="assets/images/home/Social2.png" alt="" />
                    </a>
                    <a href="">
                      <img src="assets/images/home/Social3.png" alt="" />
                    </a>
                    <a href="">
                      <img src="assets/images/home/Social4.png" alt="" />
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="fixed-menu">
          <Container>
            <Row>
              <Col lg={9} className="m-auto">
                <div
                  className={
                    menuCheck === true
                      ? "menu-strip-home open-menu"
                      : "menu-strip-home"
                  }
                >
                  <div className="outer-box-menu">
                    <p>
                      <a href="/transaction">Transaction</a>
                    </p>
                    <p>
                      <a href="">Community</a>
                    </p>
                    <p>
                      <a href="">Resources</a>
                    </p>
                    <p>
                      <a href="">Company</a>
                    </p>
                    <p>
                      <a href="">Use Slup</a>
                    </p>
                  </div>
                  <img src="assets/images/logo.png" className="logo" />
                  <div className="d-flex">
                    <button className="common-btn" onClick={()=>{navigate("/bridge")}}>
                      Buy SLUP
                  </button>
                    <button
                      className="border-btn close-btn"
                      onClick={() => {
                        removeClassOnClick();
                      }}
                    >
                      Close <img src="assets/images/home/close.png" />
                    </button>
                    <button
                      className="border-btn menu-btn"
                      onClick={() => {
                        addClassOnClick();
                      }}
                    >
                      Menu <img src="assets/images/home/Menu.png" />
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <footer className="footer-main">
          <Container>
            <Row>
              <Col lg={10} className="m-auto">
                <div className="text-center">
                  <img
                    className="logo"
                    src="assets/images/home/white-logo.png"
                    alt=""
                  />
                  <p>
                    Pioneering a BRC-20 Mobile Wallet and the First-Ever Layer 2
                    Blockchain in the BRC20 Ecosystem!
                  </p>

                  <div className="copyright-box">
                    <p> © 2024. All Rights Reserved.</p>
                    <p>
                      <a href="/privacy-policy">Privacy Policy</a>
                    </p>
                    <p>Your Crypto Journey, Reimagined!</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </>
  );
};
