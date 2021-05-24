import VacciContext from 'Context';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Container, Row } from 'reactstrap';
import { VacciButton } from 'styles';
import successIcon from '../../assets/tabler_confetti.png';
import { deleteCookie } from '../../lib/helpers/index';

function ConfirmationPage() {
  const { partnerCode, selectedVaccine, partnerUrl } = useContext(VacciContext);
  const generatedLink = `/?v=${selectedVaccine.name}${
    partnerCode ? `&&p=${partnerCode}` : ''
  }`;
  return (
    <Container>
      <Row className="justify-content-center align-items-center  text-center">
        <Col sm={8} lg={6}>
          <Row className="justify-content-center">
            <Col lg={4} md={5} sm={6} xs={3} className="text-center">
              <img src={successIcon} alt="" srcSet="" className="img-fluid" />
            </Col>
          </Row>
          <h1 className="mt-4 mb-3">
            <FormattedMessage id="Thanks" />
          </h1>
          <p className="font-weight-light">
            <FormattedMessage id="Confirmation page message" />
          </p>
        </Col>
      </Row>
      <Row className="mt-3 text-center">
        <Col>
          <VacciButton
            className="mr-3 mb-4 mb-md-0 rounded-pill px-4"
            tag="a"
            href={partnerUrl || 'https://www.vacci.se/'}
            target="_blank"
            onClick={() => {
              deleteCookie('partnerUrl');
            }}
          >
            <FormattedMessage id="Continue to the website" />
          </VacciButton>
          <VacciButton
            primary="true"
            tag="a"
            className="rounded-pill px-4"
            href={selectedVaccine.name || partnerCode ? generatedLink : '/'}
          >
            <FormattedMessage id="Book a new vaccine" />
          </VacciButton>
        </Col>
      </Row>
    </Container>
  );
}

export default ConfirmationPage;
