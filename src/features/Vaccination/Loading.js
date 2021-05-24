import React from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const Loading = ({ message, loading = true }) => (
  <Row className="justify-content-center align-items-center my-5 text-center">
    {loading ? (
      <Col>
        <span style={{ fontSize: '24px' }}>{message}</span>
        <Spinner type="grow" color="danger" className="mt-2" />
      </Col>
    ) : null}
  </Row>
);
Loading.propTypes = {
  message: PropTypes.string,
  loading: PropTypes.bool,
};
export default Loading;
