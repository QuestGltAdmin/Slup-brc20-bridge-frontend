import React from 'react'
import Layout from '../Component/Layout'
import { Col, Container, Row, Table } from 'react-bootstrap'

export const Transaction = () => {
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
                              <th>Currency</th>
                              <th>AmountIn</th>
                              <th>AmountOut</th>
                              <th>Date</th>
                              <th>Incoming TRX Hash</th>
                              <th>Outgoing TRX Hash</th>
                              <th>Wallet Address</th>
                              <th>StatusIn</th>
                              <th>StatusOut</th>
                              <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><button className="common-btn">Claim</button></td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><button className="common-btn">Claim</button></td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><button className="common-btn">Claim</button></td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><button className="common-btn">Claim</button></td>
                          </tr>
                        </tbody>
                      </Table>
                   </div>
                 </Col>
              </Row>
            </Container>
        </section>
    </Layout>
    </>
  )
}
