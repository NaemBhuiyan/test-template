import React, { useContext, useEffect, useState } from 'react';
import {
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import Loading from 'features/Vaccination/Loading';
import VacciContext from 'Context';
import { GoogleMap } from 'components';
import { FormattedMessage, useIntl } from 'react-intl';
import { getCookie } from 'lib/helpers';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { LocationApi } from '../../api/nearestLocation';
import LocationNameCard from '../../features/Vaccination/LocationNameCard';
import currentLocationIcon from '../../assets/tabler_current-location.png';

function NearestLocation() {
  const { messages } = useIntl();
  const history = useHistory();
  const {
    setLoading,
    loading,
    userLocation,
    placeSearchValue,
    setPlaceSearchValue,
    selectedVaccine,
    setSelectedVaccine,
  } = useContext(VacciContext);
  const [nearestLocations, setNearestLocations] = useState([]);
  const [locationRadious, setLocationRadious] = useState(1600);
  const [lastLocationRadious, setLastLocationRadious] = useState(true);
  const [radius, setRadius] = useState('');
  const [feedback, setFeedback] = useState(false);

  const onPlacheSearchChange = ({ target }) => {
    setPlaceSearchValue(target.value);
    if (target.value) {
      setFeedback(false);
    }
  };
  // taking time when give input in radius field
  useEffect(() => {
    if (radius && !lastLocationRadious) {
      const timeOutId = setTimeout(() => setLocationRadious(radius), 1500);
      return () => clearTimeout(timeOutId);
    }
    return 0;
  }, [radius, lastLocationRadious]);

  // check if come with vaccine. if not, send to the home page
  useEffect(() => {
    if (!getCookie('selectedVaccine')?.name) {
      setSelectedVaccine({ name: '' });
      history.push('/');
      toast.error('Please book vaccine');
    }
  }, []);

  // fetch locations
  useEffect(() => {
    async function fetchLocation() {
      setLoading(true);
      const loc = await LocationApi.getNearestLocation(
        userLocation.lat,
        userLocation.lng,
        locationRadious,
        selectedVaccine.name,
      );
      if (loc?.data) {
        if (loc.data.length >= 20 && lastLocationRadious) {
          const FirstTwentyLocation = loc.data.splice(0, 20);
          setNearestLocations(FirstTwentyLocation);
          setLoading(false);
        } else {
          setNearestLocations(loc?.data);
          setLoading(false);
        }
      }
      if (loc?.error) {
        setLoading(false);
      }
    }
    if (userLocation.lng && selectedVaccine.name && locationRadious) {
      fetchLocation();
    }
  }, [
    userLocation.lng,
    selectedVaccine.name,
    locationRadious,
    lastLocationRadious,
  ]);

  // find last location distance
  useEffect(() => {
    if (lastLocationRadious && nearestLocations.length) {
      setRadius(
        Math.ceil(nearestLocations[nearestLocations.length - 1]?.distance),
      );
    } else {
      setRadius('');
    }
  }, [nearestLocations, lastLocationRadious]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center" lg={8}>
          <h1 className="mb-5">
            <FormattedMessage id="We help you find a clinic near you" />
          </h1>
          <Form
            className="mb-5"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <Row form className="mb-2">
              <Col>
                <FormGroup>
                  <Input
                    invalid={feedback}
                    id="pac-input"
                    className="position-relative"
                    type="text"
                    value={placeSearchValue || ''}
                    placeholder={messages['Enter your current location']}
                    onChange={onPlacheSearchChange}
                  />
                  <FormFeedback>Välj plats först</FormFeedback>
                  <span
                    className="current-location-icon"
                    id="placeSearchCurrentLocationIcon"
                  >
                    <img
                      src={currentLocationIcon}
                      alt=""
                      srcSet=""
                      width="25"
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="placeSearchCurrentLocationIcon"
                    >
                      <FormattedMessage id="Get my current place" />
                    </UncontrolledTooltip>
                  </span>
                </FormGroup>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-center">
              <Col xs="auto pr-0">
                <p>Sök inom</p>
              </Col>
              <Col md={2} xs={3}>
                <FormGroup inline>
                  <Input
                    type="number"
                    name="radius"
                    defaultValue={userLocation.lng && radius}
                    onChange={({ target }) => {
                      if (userLocation.lng) {
                        setRadius(target.value);
                        setLastLocationRadious(false);
                      }
                      if (!userLocation.lng || placeSearchValue?.length < 1) {
                        setFeedback(true);
                      }
                    }}
                  />
                </FormGroup>
              </Col>
              <Col xs="auto pl-0">
                <p>Km</p>
              </Col>
            </Row>
          </Form>

          {nearestLocations.length ? (
            <h4 className="mb-md-5 mb-4 text-center">Närmaste platser</h4>
          ) : null}
        </Col>
      </Row>
      {loading ? (
        <Loading message={messages['Locations...']} loading={loading} />
      ) : (
        <Row className="align-items-stretch">
          <Col
            md={6}
            style={{ overflow: 'auto', maxHeight: '700px' }}
            className="order-1 order-md-0"
          >
            {nearestLocations.map(location => (
              <LocationNameCard key={location.id} location={location} />
            ))}
            {userLocation.lng &&
              nearestLocations.length < 1 &&
              'Plats kunde inte hittas'}
          </Col>
          <Col
            md={6}
            className="mb-5 mb-md-0"
            style={userLocation.lng && { minHeight: '300px' }}
          >
            <GoogleMap nearestLocations={nearestLocations} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default NearestLocation;
