import React, { useContext } from 'react';
import VacciContext from 'Context';
import { Form, FormGroup, Label, Input, Row, Col, Spinner } from 'reactstrap';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';

import { CustomLabel, VacciButton } from 'styles';
import { useHistory } from 'react-router-dom';
import { patchRecordsData } from 'lib/helpers';

const CustomCheckBox = styled(Input)`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 4px;
`;

const UserForm = () => {
  const {
    userFormData,
    formDispatch,
    customerId,
    setLoading,
    loading,
  } = useContext(VacciContext);
  const history = useHistory();
  const { messages } = useIntl();

  const handleSubmit = async e => {
    setLoading(true);
    if (
      !!userFormData.name &&
      !!userFormData.email &&
      !!userFormData.phone &&
      !!userFormData.terms
    ) {
      e.preventDefault();
      const response = await patchRecordsData(customerId, {
        ...userFormData,
        status: 'booking',
      });
      if (response?.status === 200) {
        setLoading(false);
        history.push('/booking-widget');
      }
      if (response?.error) {
        setLoading(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <CustomLabel for="userName" className="py-0 text-primary">
          {messages['Name']}
          <span className="text-danger">*</span>
        </CustomLabel>
        <Input
          type="text"
          name="name"
          id="userName"
          placeholder={messages['Write your name here']}
          bsSize="lg"
          required
          value={userFormData.name}
          onChange={({ target }) => {
            formDispatch({
              type: 'ADD_NAME',
              payload: { [target.name]: target.value },
            });
          }}
        />
      </FormGroup>
      <FormGroup>
        <CustomLabel for="userEmail" className="py-0 text-primary">
          <FormattedMessage id="Email address" />
          <span className="text-danger">*</span>
        </CustomLabel>
        <Input
          type="email"
          name="email"
          id="userEmail"
          placeholder={messages['Write your email here']}
          bsSize="lg"
          required
          value={userFormData.email}
          onChange={({ target }) => {
            formDispatch({
              type: 'ADD_EMAIL',
              payload: { [target.name]: target.value },
            });
          }}
        />
      </FormGroup>
      <FormGroup>
        <CustomLabel for="userPhoneNumber" className="py-0 text-primary">
          <FormattedMessage id="Mobile number" />
          <span className="text-danger">*</span>
        </CustomLabel>
        <Input
          type="text"
          name="phone"
          id="userPhoneNumber"
          placeholder={messages['Write your phone number here']}
          bsSize="lg"
          required
          value={userFormData.phone}
          onChange={({ target }) => {
            formDispatch({
              type: 'ADD_PHONE',
              payload: { [target.name]: target.value },
            });
          }}
        />
      </FormGroup>
      <FormGroup check className="mb-3 mt-4">
        <CustomCheckBox
          type="checkbox"
          name="terms"
          id="termsCheck"
          required
          checked={userFormData.terms}
          onChange={({ target }) => {
            formDispatch({
              type: 'TERMS',
              payload: { [target.name]: target.checked },
            });
          }}
        />
        <Label for="termsCheck" check className="ml-3 mt-1 text-primary">
          <span className="mr-2">
            <FormattedMessage id="I have read and agree with" />
          </span>
          <a href="https://vacci.se/villkor/" target="_blank" rel="noreferrer">
            <FormattedMessage id="Vacci's terms" />
          </a>
        </Label>
      </FormGroup>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <VacciButton primary="true" type="submit">
            {loading ? (
              <Spinner size="sm" color="secondary" />
            ) : (
              <FormattedMessage id="Continue" />
            )}
          </VacciButton>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
