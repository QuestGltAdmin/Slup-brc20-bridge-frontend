import React, { useState } from "react";
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

export const Privacy = () => {
  return (
    <>
      <Layout>
        <section className="privacy-sec">
          <Container>
            <Row>
              <Col md={10} className="m-auto">
                <div>
                  <h2>Privacy Policy</h2>
                  <div className="content-box-privacy">
                    <p>
                      Please be aware that this privacy statement will be
                      updated regularly to reflect any changes in the way we
                      handle your personal information or in applicable laws.
                    </p>
                    <p>
                      The following Privacy Notice outlines the policies and
                      procedures of DApps Platform, Inc. (“we,” “our,” or “us”)
                      regarding the collection, use, and disclosure of your
                      information through our Services or SLUP Wallet
                    </p>
                    <h4>OVERVIEW</h4>
                    <p>
                      We understand the importance of protecting your personal
                      data and privacy rights. Therefore, we have outlined in
                      the following sections how we handle your personal
                      information through Yuse Wallet. We only share your
                      information with third parties to deliver our Services and
                      products, comply with the law, improve Yuse Wallet,
                      protect our rights, or effectuate a business transfer. We
                      are not a faceless corporation but developers striving to
                      provide a remarkable product. If you have any questions or
                      concerns about this policy, please contact us at
                    </p>
                    <h4>HOW TO ACCEPT THIS POLICY?</h4>
                    <p>
                      By using Yuse Wallet, including downloading one of our
                      mobile applications or visiting our website, you agree to
                      the use, disclosure, and procedures outlined in this
                      Privacy Policy.
                    </p>
                    <h4>
                      WHAT PERSONAL INFORMATION DO WE COLLECT FROM OUR USERS?
                    </h4>
                    <p>
                      We strive to minimize the collection of Personal
                      Information from Yuse Wallet users. When you contact us
                      for support or report an error related to Yuse Wallet, we
                      may collect your contact information, such as your phone
                      number or email address (depending on how you contact us).
                      When you use our Services, we process PUBLIC wallet
                      addresses generated through Yuse Wallet.
                    </p>
                    <h4>
                      WILL YUSE WALLET SHARE PERSONAL DATA WITH THIRD PARTIES?
                    </h4>
                    <p>
                      Yuse Wallet does not sell users’ personal information to
                      others. However, personal data may be transferred to
                      service providers or third parties in connection with Yuse
                      Wallet’s operation of its business. These third-party
                      service providers only have access to certain Personal
                      Information, such as public wallet addresses, to perform
                      their functions and may not use it for other purposes.
                      Furthermore, they must process the personal information in
                      accordance with contractual agreements and only as
                      permitted by applicable data protection laws.
                    </p>
                    <p>
                      In the event that Yuse Wallet sells or buys other
                      businesses or services, user information generally is one
                      of the transferred business assets but remains subject to
                      the promises made in any pre-existing privacy notice
                      (unless the user consents otherwise). Also, in the
                      unlikely event that Yuse Wallet or substantially all of
                      its assets are acquired, users’ information will be one of
                      the transferred assets.  
                    </p>
                    <p>
                      Yuse Wallet may also share non-personally identifiable
                      information publicly and with partners, such as
                      publishers, advertisers, developers, or right holders.
                    </p>
                    <h4>
                      HOW DOES YUSE WALLET USE THE INFORMATION IT GATHERS?
                    </h4>
                    <p>
                      Yuse Wallet primarily uses the limited information that it
                      collects to enhance the app. Personal information is not
                      rented, traded, or sold. Some ways Yuse Wallet may use
                      Personal Information are to contact users when necessary,
                      respond to comments or questions related to bugs or
                      errors, provide additional information, send information
                      and marketing materials about services and products
                      available through the app, train team members, and for
                      other internal business purposes.
                    </p>
                    <p>
                      Yuse Wallet may also share or disclose aggregated personal
                      data or non-personal information with service providers or
                      other persons with whom it conducts business, including
                      but not limited to potential third-parties for the purpose
                      of showcasing the company’s performance.
                    </p>
                    <p>
                      Yuse Wallet may provide Personal Information to its
                      employees, contractors, agents, service providers, and
                      designees (“Agents”) to enable them to perform certain
                      services for the company, including improvement of
                      website-related services and features and performance of
                      maintenance services.
                    </p>
                    <p>
                      If Yuse Wallet buys or sells assets, customer information
                      is typically one of the business assets that would be
                      transferred. Also, if Yuse Wallet (or its assets) are
                      acquired or if it goes out of business, enters bankruptcy,
                      or goes through some other change of control, Personal
                      Information could be one of the assets transferred to or
                      acquired by a third party.
                    </p>
                    <p>
                      Yuse Wallet will share personal information outside of the
                      app if it has a reasonable belief that access, use,
                      preservation, or disclosure of the information is
                      reasonably necessary to comply with any applicable law,
                      regulation, legal process, or enforceable governmental
                      request; to cooperate with law enforcement; to enforce or
                      apply the app’s terms of use and other agreements; or to
                      protect the rights, property, or safety of Yuse Wallet,
                      its employees, its users, or others.
                    </p>

                    <h4>
                      WHAT ARE USER’S RIGHTS WITH RESPECT TO THE PROCESSING OF
                      PERSONAL DATA?
                    </h4>
                    <p className="text-start">
                      Users are entitled (under the conditions, and subject to
                      the exceptions, set out in applicable law) to:
                    </p>
                    <ul>
                      <li>
                        Request access to the personal information Yuse Wallet
                        processes about them
                      </li>
                      <li>Request a rectification of their personal data</li>
                      <li>Object to the processing of their personal data</li>
                      <li>Request to erase their personal data</li>
                      <li>
                        Request the restriction of the processing of their
                        personal data
                      </li>
                    </ul>
                    <p className="text-start">
                      Any data that is no longer needed for purposes specified
                      in the “How We Use the Information We Gather” section will
                      be deleted after ninety (90) days. Wallet addresses
                      created through the Yuse Wallet application cannot be
                      deleted from the Ethereum blockchain, therefore Yuse
                      Wallet is unable to delete this personal information. If
                      at any point users wish for Yuse Wallet to delete
                      information about them, they may contact the company at
                    </p>
                    <h4>DATA RETENTION:</h4>
                    <p>
                      Please be aware that even if you delete your Wallet or
                      addresses from the Yuse Wallet mobile application,
                      uninstall the Yuse Wallet mobile application from your
                      device, or request that your information be deleted, we
                      may still retain some information that you have provided
                      to us for the purposes of maintaining Yuse Wallet or to
                      comply with the laws and regulations to which Yuse Wallet
                      is subject. If you have any questions or objections
                      regarding how we collect and process your personal
                      information, please contact
                    </p>
                    <h4>DATA SECURITY:</h4>
                    <p>
                      We take the protection of your information seriously and
                      are committed to safeguarding it in accordance with
                      applicable laws and our data privacy policies. We have
                      chosen third-party vendors that use the Ethereum network,
                      such as Coinbase, Shapeshift, and Changelly, to assist us
                      in securing your personal information. However, we do not
                      control these third parties and cannot guarantee complete
                      security. We use encryption protocols and software to
                      protect the security of your personal information during
                      transmission and maintain physical, electronic, and
                      procedural safeguards in connection with the collection,
                      storage, and disclosure of your personal information.
                      Despite these precautions, we cannot fully guarantee
                      against unauthorized access, disclosure, alteration, or
                      deletion of data due to events such as hardware or
                      software failure or unauthorized use. Any information that
                      you provide to us is done so entirely at your own risk.
                    </p>
                    <h4>CHILDREN:</h4>
                    <p>
                      We are sensitive to the privacy of children and do not
                      target our Services towards children. To use our services,
                      users must be at least eighteen (18) years old. We do not
                      knowingly collect information from children under the age
                      of 13. If you are a parent or legal guardian of a minor
                      child and use Yuse Wallet on behalf of your child, any
                      information you provide to us will be treated as Personal
                      Information in accordance with this Privacy Policy. If you
                      have any questions about our information practices with
                      respect to children or if you learn that a child under the
                      age of 13 has used Yuse Wallet, created a user account, or
                      provided us with personal information, please email us at
                      support
                    </p>
                    <h4>
                      CONDITIONS OF USE, NOTICES, CHANGES, AND UPDATES TO
                      PRIVACY NOTICE:
                    </h4>
                    <p>
                      Your use of Yuse Wallet and any disputes over privacy are
                      subject to this Notice and our Terms of Use. If you have
                      any concerns about privacy at Yuse Wallet, please contact
                      us with a complete description, and we will try to resolve
                      it. You also have the right to contact your local Data
                      Protection Authority. We reserve the right to update and
                      revise this Privacy Policy at any time. We periodically
                      review this Privacy Notice to ensure that it complies with
                      applicable laws and reflects changes in our business. If
                      we revise this Privacy Notice, we will update the
                      “Effective Date” at the top of this page and do our best
                      to notify you. Please review this Privacy Notice regularly
                      to stay informed of any changes. By continuing to use Yuse
                      Wallet after any amendment to our Privacy Notice, you are
                      agreeing to the revised or amended terms.
                    </p>
                    <h4>QUESTIONS:</h4>
                    <p>
                      If you have any questions, please contact us by email or
                      send us a message. <br /> Thanks for reading our Privacy
                      Policy!
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
};
