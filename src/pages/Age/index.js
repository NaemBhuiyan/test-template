import React from 'react';
import {
  Col,
  Container,
  Form,
  Row,
  FormGroup,
  Input,
  CustomInput,
} from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { CustomLabel, VacciButton } from 'styles';

function Age() {
  const { messages } = useIntl();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="mb-5">
            <FormattedMessage id="Enter your age" />
          </h1>
          <Form>
            <FormGroup>
              <CustomLabel for="age" className="py-0 text-primary">
                {messages['Age']}
                <span className="text-danger">*</span>
              </CustomLabel>
              <Input
                bsSize="lg"
                type="text"
                name="age"
                id="age"
                placeholder={messages['Write your age']}
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <CustomLabel for="sex" className="py-0 text-primary">
                {messages['Sex']}
                <span className="text-danger">*</span>
              </CustomLabel>
              <div>
                <CustomInput
                  type="radio"
                  id="male"
                  value="male"
                  name="userGender"
                  label={messages['Male']}
                  className="vacci-radio"
                  inline
                  onChange={({ target }) => {
                    console.log(target.value);
                  }}
                />
                <CustomInput
                  type="radio"
                  id="female"
                  value="female"
                  name="userGender"
                  label="Female"
                  className="vacci-radio"
                  inline
                  onChange={({ target }) => {
                    console.log(target.value);
                  }}
                />
                <CustomInput
                  type="radio"
                  id="Other"
                  name="userGender"
                  label="Other"
                  value="other"
                  className="vacci-radio"
                  inline
                  onChange={({ target }) => {
                    console.log(target.value);
                  }}
                />
              </div>
            </FormGroup>

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

export default Age;
