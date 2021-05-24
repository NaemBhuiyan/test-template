import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { VacciButton } from 'styles';
import { getWithExpiry, setWithExpiry } from 'lib/helpers';
import { Section } from '../../styles/Section';

function ErrorFallback({ error }) {
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (
      error?.error?.message &&
      chunkFailedMessage.test(error?.error.message)
    ) {
      console.log('chunk failed error!');
      if (!getWithExpiry('chunk_failed')) {
        setWithExpiry('chunk_failed', 'true', 10000);
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <Section>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <div className="text-center">
              <h1>
                <FormattedMessage id="Uh, something went wrong" />
              </h1>
              <p className="text-danger">{error?.error.toString()}</p>
              <VacciButton
                primary="true"
                size="lg"
                tag="a"
                href="/"
                className="mt-4 mr-4"
              >
                <FormattedMessage id="Please try again" />
              </VacciButton>
              <VacciButton
                tag="a"
                href="https://vacci.se/"
                target="_blank"
                className="mt-4"
              >
                <FormattedMessage id="Go home" />
              </VacciButton>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
};

export default ErrorFallback;
