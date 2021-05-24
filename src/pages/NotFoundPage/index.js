import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { VacciButton } from 'styles';

function NotFoundPage() {
  const { goBack } = useHistory();
  return (
    <Row className="justify-content-center align-items-center">
      <Col xs={11} md="auto" className="text-center">
        <h1 className="display-4">Woopsie Daisy!</h1>
        <p className="lead">There is Something wrong</p>
        <p className="lead">Maybe the page you request for, is not found</p>

        <p className="lead">
          <VacciButton tag={Link} to="/" className="mr-4">
            Go home
          </VacciButton>
          <VacciButton primary="true" onClick={() => goBack()}>
            Go Back
          </VacciButton>
        </p>
      </Col>
    </Row>
  );
}

export default NotFoundPage;
