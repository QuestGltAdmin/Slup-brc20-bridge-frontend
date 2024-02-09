import React from "react";
import { Navbar, Container, Nav, Button, Col, Row,NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Header() {


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
                                    
                                    <Link to='/' className="ms-auto common-btn">Connect Wallet</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}