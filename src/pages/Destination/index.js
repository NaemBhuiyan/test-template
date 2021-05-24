import React from 'react';
import { Col, Container, Form, Row, FormGroup, Input } from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import { CustomLabel, VacciButton } from 'styles';

function Destination() {
  const { messages } = useIntl();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="mb-5">
            <FormattedMessage id="Where are you going?" />
          </h1>
          <Form>
            <FormGroup>
              <CustomLabel for="destination" className="py-0 text-primary">
                {messages['Destination']}
                <span className="text-danger">*</span>
              </CustomLabel>
              <Input bsSize="lg" type="select" name="select" id="destination">
                <option>{messages['Select destination']}</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <CustomLabel for="form" className="py-0 text-primary">
                    {messages['From']}
                    <span className="text-danger">*</span>
                  </CustomLabel>
                  <Input
                    bsSize="lg"
                    type="date"
                    name="date"
                    id="form"
                    placeholder="date placeholder"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <CustomLabel for="to" className="py-0 text-primary">
                    {messages['To']}
                    <span className="text-danger">*</span>
                  </CustomLabel>
                  <Input
                    bsSize="lg"
                    type="date"
                    name="date"
                    id="to"
                    placeholder="Select"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="text-center">
                <VacciButton primary="true" type="submit">
                  <FormattedMessage id="Continue" />
                </VacciButton>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Destination;
