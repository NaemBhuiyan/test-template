import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { VacciButton } from 'styles';
import VacciContext from 'Context';
import { deleteCookie, getCookie, patchRecordsData } from 'lib/helpers';
import { FormattedMessage, useIntl } from 'react-intl';
import config from 'config';
import Loading from '../../features/Vaccination/Loading';

function BookingWidget() {
  const { messages } = useIntl();
  const {
    customerId,
    selectedVaccine,
    supliersCode,
    language,
    clientoHashId,
  } = useContext(VacciContext);
  const [showButton, setShowButton] = useState(
    getCookie('showButton') || false,
  );

  const history = useHistory();
  const clientoPreviewUrl =
    config.BACKEND_ROOT_URL === 'https://api.vacci.se'
      ? 'https://cliento.com/widget-v2/cliento.js'
      : 'https://preview.cliento.com/widget-v2/cliento.js';

  useEffect(() => {
    ((c, l, i, e, n, t, o) => {
      if (c.cbk) {
        return;
      }
      // eslint-disable-next-line
      c.cbk = function () {
        // eslint-disable-next-line
        c.cbk.p.push(arguments);
      };
      c.cbk.p = [];
      e = l.createElement('script');
      e.async = 1;
      e.src = i;
      l.head.appendChild(e);
      n = l.createElement('div');
      n.id = 'cliento-booking';
      t = l.getElementsByTagName('script');
      o = t[t.length - 1];
      o.parentNode.insertBefore(n, o);
    })(window, document, clientoPreviewUrl);
    if (config.BACKEND_ROOT_URL !== 'https://api.vacci.se') {
      window.cbk('api', 'https://preview.cliento.com/');
    }
    window.cbk('id', supliersCode);
    window.cbk(
      'serviceFilter',
      service => service.name.indexOf(selectedVaccine.name) !== -1,
    );
    window.cbk('mergeLocations', true);
    window.cbk('resourceFilter', resource => resource.hashId === clientoHashId);
    window.cbk('style', {
      primaryColor: '#8F6F74',
    });
    window.cbk('onCompleted', async booking => {
      const { name, email, phone } = booking.customer;
      const response = await patchRecordsData(customerId, {
        supplier_code: booking.locationId,
        status: 'confirmed',
        name,
        email,
        phone,
      });
      if (response?.error) {
        console.error('Response not sent');
      }
      if (response?.data?.status === 'confirmed') {
        deleteCookie('customerId');
        deleteCookie('supliersCode');
        deleteCookie('selectedVaccine');
        deleteCookie('partnerCode');
        deleteCookie('clientoHashId');
        deleteCookie('userLocation');
        deleteCookie('placeSearchValue');
        setShowButton(true);
      }
    });
    window.cbk('partner', 'vacci');
    window.cbk('locale', language);
  }, [language,clientoHashId,clientoPreviewUrl,customerId,selectedVaccine.name,supliersCode]);

  return (
    <Container>
      <Row>
        <Col className="text-center mb-4">
          <h1 className="fs-sm-2 fs-4">
            {`Boka din ${selectedVaccine.name}-vaccination här`}
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center my-5">
        <Col lg={8} id="cliento-booking">
          <Loading message={messages['Loading widget...']} />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="text-center mt-5">
          {!showButton && (
            <VacciButton
              primary="true"
              className="mt-5 rounded-pill px-4"
              onClick={() => {
                history.push('/nearest-location');
              }}
            >
              Tillbaka till närmaste platser
            </VacciButton>
          )}
          {showButton && (
            <VacciButton
              primary="true"
              size="lg"
              className="rounded-pill px-5"
              onClick={() => {
                history.push('/confirmation');
              }}
            >
              <FormattedMessage id="Next" />
            </VacciButton>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BookingWidget;
