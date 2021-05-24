import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';

import VacciContext from 'Context';
import { Card, CardText, Row, Col, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getCookie, patchRecordsData } from 'lib/helpers';
import { toast } from 'react-toastify';
import { VacciButton } from 'styles';
import arrowRightIcon from '../../assets/Mask.png';

async function statusUpdate(customerId) {
  const response = await patchRecordsData(customerId, {
    status: 'booking',
  });
  if (response?.error) {
    console.error('Response not sent');
  }
}
const LocationNameCard = ({ location }) => {
  const history = useHistory();

  const { setClientoHashId, customerId } = useContext(VacciContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    setClientoHashId(location.cliento_hash_id);
  };
  const handleNextClick = () => {
    if (getCookie('clientoHashId')) {
      history.push('/booking-widget');
      history.go('/booking-widget');
      statusUpdate(customerId);
    } else {
      toast.warn('Please select a location first');
    }
  };
  return (
    <Card
      body
      color="white"
      className="mb-2 border-0 shadow"
      onClick={toggle}
      style={{ cursor: 'pointer' }}
    >
      <Row className="align-items-center" id={location.name}>
        <Col>
          <p className="text-dark font-weight-bold mb-1">{location.name}</p>
          <CardText tag="p" className="text-dark mb-0">
            {`Distans: ${Math.ceil(location.distance)} Km`}
          </CardText>
          <Collapse isOpen={isOpen}>
            <VacciButton
              primary="true"
              onClick={handleNextClick}
              className="mt-3 rounded-pill px-4"
            >
              <FormattedMessage id="Continue" />
            </VacciButton>
          </Collapse>
        </Col>
        <Col xs="auto" className="rounded-circle py-2">
          <img
            src={arrowRightIcon}
            alt="arrow icon"
            srcSet=""
            height="20"
            className={isOpen ? 'rotate-90' : null}
          />
        </Col>
      </Row>
    </Card>
  );
};

LocationNameCard.propTypes = {
  location: PropTypes.object,
};

export default LocationNameCard;
