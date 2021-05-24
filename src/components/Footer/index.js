import React from 'react';
import { Col, Container, Row, Nav, NavLink } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import logo from '../../assets/logo.png';

function Footer() {
  return (
    <footer className="mt-auto">
      <Container className="border-top pb-2 pt-4">
        <Row className="justify-content-center align-items-center flex-column">
          <Col xs={2} sm={1} className="mb-1">
            <a href="/">
              <img className="img-fluid" src={logo} alt="" srcSet="" />
            </a>
          </Col>
          <Col xs="auto">
            <Nav className="align-content-center">
              <NavLink
                href="https://vacci.se/"
                target="_blank"
                className="text-secondary"
              >
                <FormattedMessage id="Home" />
              </NavLink>

              <NavLink
                href="https://vacci.se/#kontakt"
                target="_blank"
                className="text-secondary"
              >
                <FormattedMessage id="Contact" />
              </NavLink>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="text-center">
            <p className="mb-0 text-muted">
              <FormattedMessage id="Footer content" />
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
