import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { useQuery } from 'lib/hooks';
import {
  createCustomerId,
  deleteCookie,
  getCookie,
  patchRecordsData,
} from 'lib/helpers';
import { VacciButton } from 'styles';
import { ErrorFallback } from 'components';
import VacciContext from '../../Context';
import Loading from './Loading';
import nurseIllustration from '../../assets/nurse-illustration.png';

function VaccinationSelection({ errorMassage }) {
  const {
    selectedVaccine,
    setSelectedVaccine,
    partnerCode,
    setPartnerCode,
    customerId,
    setCustomerId,
    setLoading,
    loading,
    setPartnerUrl,
    setSupliersCodes,
    setErrorMassage,
  } = useContext(VacciContext);
  const history = useHistory();
  const query = useQuery();
  const { messages } = useIntl();

  const createUser = async () => {
    let response = null;

    if (!customerId) {
      setLoading(true);
      response = await createCustomerId();
    }

    if (response?.data?.customer_uuid) {
      setCustomerId(response.data.customer_uuid);
      setLoading(false);
    }
    if (response?.error) {
      setLoading(false);
      setErrorMassage(true);
    }
  };

  useEffect(() => {
    // take value from query param
    const vaccineNameFromQueryParam = query.get('v');
    const partnerCodeFromQueryParam = query.get('p');

    if (vaccineNameFromQueryParam) {
      deleteCookie('selectedVaccine');
    }

    if (partnerCodeFromQueryParam) {
      if (partnerCodeFromQueryParam !== getCookie('partnerCode')) {
        setPartnerCode('');
        setCustomerId('');
        setSelectedVaccine({ id: 1, name: '' });
      }
      setPartnerCode(partnerCodeFromQueryParam);
    }

    if (vaccineNameFromQueryParam) {
      setSelectedVaccine({
        ...selectedVaccine,
        name: vaccineNameFromQueryParam,
      });
    }
  }, [partnerCode, setSelectedVaccine.name, customerId]);

  // Control to go next page
  useEffect(async () => {
    if (selectedVaccine.name || partnerCode) {
      await createUser();
      const data = {};
      let response;
      if (selectedVaccine.name) {
        data.vaccine_slug = selectedVaccine.name;
        data.status = 'map-initiated';
      }

      if (partnerCode) {
        data.partner_code = partnerCode;
      }
      if (customerId) {
        setLoading(true);
        response = await patchRecordsData(customerId, {
          ...data,
        });
      }
      if (response?.data?.vaccine || response?.data?.partner) {
        if (response?.data?.vaccine) {
          const codes = response?.data?.vaccine_supplier_list.map(
            suplier => suplier.code,
          );
          setSupliersCodes(codes);
          if (selectedVaccine.name) {
            history.push('/nearest-location');
          }
        }
        setPartnerUrl(response?.data?.partner_detail?.url);
        setLoading(false);
      }

      if (response?.error) {
        setLoading(false);
        setSelectedVaccine({
          ...selectedVaccine,
          name: '',
        });
      }
    }
  }, [partnerCode, selectedVaccine.name, customerId]);

  return (
    <>
      {loading ? (
        <Loading message={messages['Loading...']} loading={loading} />
      ) : (
        <Container>
          {errorMassage ? (
            <ErrorFallback />
          ) : (
            <Row className="align-items-center">
              <Col md={6}>
                <h1>
                  <FormattedMessage id="RIGHT" />
                  &nbsp;&nbsp;
                  <span className="brand-name-heading">VACCIN</span>
                </h1>
                <h1>
                  <FormattedMessage id="IN THE RIGHT TIME" />
                </h1>
                <p className="w-75 text-black-50 my-4 font-weight-lighter ">
                  <FormattedMessage id="Home page content" />
                </p>
                <VacciButton
                  primary="true"
                  className="rounded-pill px-4"
                  onClick={() => {
                    setSelectedVaccine({
                      ...selectedVaccine,
                      ...{ id: 1, name: 'TBE' },
                    });
                  }}
                >
                  <FormattedMessage id="Book a vaccine" />
                </VacciButton>
              </Col>
              <Col md={6} className="text-center mt-5 mt-md-0">
                <img src={nurseIllustration} alt="" srcSet="" />
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
}
VaccinationSelection.propTypes = {
  errorMassage: PropTypes.bool,
};
export default VaccinationSelection;
