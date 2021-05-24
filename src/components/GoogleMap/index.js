import React, { useEffect, useContext } from "react";
import VacciContext from "Context";
import PropType from "prop-types";
import vacciLogo from "../../assets/map-logo.png";

const setMarker = (map, infowindow, nearestLocations) => {
  nearestLocations.forEach((mark) => {
    const marker = new window.google.maps.Marker({
      position: {
        lat: mark?.location?.coordinates[1],
        lng: mark?.location?.coordinates[0],
      },
      map,
    });
    window.google.maps.event.addListener(
      marker,
      "click",
      function infoContent() {
        infowindow.setContent(`<div><strong>${mark.name}</strong><br>`);
        infowindow.open(map, this);
      }
    );
  });
};

const Map = ({ nearestLocations }) => {
  const { setUserLocation, userLocation, setPlaceSearchValue } =
    useContext(VacciContext);

  useEffect(() => {
    // map init
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center:
        userLocation?.lng && userLocation?.lat
          ? userLocation
          : {
              lat: 59.3293,
              lng: 18.0686,
            },
      zoom: 5,
      disableDefaultUI: true,
    });
    const infowindow = new window.google.maps.InfoWindow();
    const input = document.getElementById("pac-input");
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    const geocoder = new window.google.maps.Geocoder();
    const userMarker = new window.google.maps.Marker({
      position: userLocation.lng && userLocation,
      map,
      icon: vacciLogo,
    });
    infowindow.setContent(`<div><strong>Här är du nu</strong><br>`);
    infowindow.open(map, userMarker);
    autocomplete.bindTo("bounds", map);
    // Specify just the place data fields that you need.
    autocomplete.setFields([
      "place_id",
      "geometry",
      "name",
      "formatted_address",
    ]);

    // on click current location button
    const currentLocationButton = document.getElementById(
      "placeSearchCurrentLocationIcon"
    );

    currentLocationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude,
            };
            geocoder.geocode({ location: pos }, (results, status) => {
              if (status === "OK") {
                setUserLocation(pos);
                setPlaceSearchValue(results[0]?.formatted_address);
              }
            });
          },
          // eslint-disable-next-line no-alert
          () => alert(`Location not found`),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    });

    // map.addListener('click', e => {
    //   placeMarkerAndPanTo(
    //     { location: e.latLng },
    //     map,
    //     marker,
    //     infowindowContent,
    //   );
    // });
    // marker.addListener('click', () => {
    //   infowindow.open(map, marker);
    // });

    // search operation
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      const place = autocomplete.getPlace();
      const searchLatLng = {
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      };
      setUserLocation(searchLatLng);
      setPlaceSearchValue(place.formatted_address);
    });

    // set marker of nearest location
    if (nearestLocations) {
      setMarker(map, infowindow, nearestLocations);
    }
  }, [nearestLocations, userLocation, setUserLocation, setPlaceSearchValue]);

  return (
    <>
      <div
        style={{ position: "relative", height: "100%" }}
        id="map"
        className="rounded"
      />
      <div id="infowindow-content">
        <span id="place-name" className="title" />
        <span id="place-address" />
      </div>
    </>
  );
};

Map.propTypes = {
  nearestLocations: PropType.array,
};

export default Map;
