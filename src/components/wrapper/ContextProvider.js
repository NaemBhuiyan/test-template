import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import VacciContext from "../../Context";
import { setCookie, getCookie } from "../../lib/helpers/manageCookies";

function ContextProvider({ children }) {
  const [customerId, setCustomerId] = useState(getCookie("customerId") || "");
  const [selectedVaccine, setSelectedVaccine] = useState(
    getCookie("selectedVaccine") || {}
  );
  const [partnerCode, setPartnerCode] = useState(
    getCookie("partnerCode") || ""
  );

  const [errorMassage, setErrorMassage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [clientoHashId, setClientoHashId] = useState(
    getCookie("clientoHashId") || ""
  );
  const [userLocation, setUserLocation] = useState(
    getCookie("userLocation") || {}
  );
  const [language, setLanguage] = useState("sv");
  const [supliersCode, setSupliersCodes] = useState(
    getCookie("supliersCode") || []
  );
  const [partnerUrl, setPartnerUrl] = useState(getCookie("partnerUrl") || "");
  const [placeSearchValue, setPlaceSearchValue] = useState(
    getCookie("placeSearchValue") || ""
  );

  useEffect(() => {
    setCookie("customerId", customerId, 1);
  }, [customerId]);

  useEffect(() => {
    setCookie("selectedVaccine", selectedVaccine, 1);
  }, [selectedVaccine]);

  useEffect(() => {
    setCookie("supliersCode", supliersCode, 1);
  }, [supliersCode]);

  useEffect(() => {
    if (partnerCode) {
      setCookie("partnerCode", partnerCode, 1);
    }
  }, [partnerCode]);

  useEffect(() => {
    if (clientoHashId) {
      setCookie("clientoHashId", clientoHashId, 1);
    }
  }, [clientoHashId]);

  useEffect(() => {
    if (userLocation) {
      setCookie("userLocation", userLocation, 1);
    }
  }, [userLocation]);

  useEffect(() => {
    if (partnerUrl) {
      setCookie("partnerUrl", partnerUrl, 1);
    }
  }, [partnerUrl]);

  useEffect(() => {
    if (placeSearchValue) {
      setCookie("placeSearchValue", placeSearchValue, 1);
    }
  }, [placeSearchValue]);

  const providerValue = useMemo(
    () => ({
      selectedVaccine,
      setSelectedVaccine,
      customerId,
      partnerCode,
      setPartnerCode,
      loading,
      setLoading,
      setCustomerId,
      language,
      setLanguage,
      errorMassage,
      setErrorMassage,
      supliersCode,
      partnerUrl,
      setPartnerUrl,
      setSupliersCodes,
      userLocation,
      setUserLocation,
      clientoHashId,
      setClientoHashId,
      placeSearchValue,
      setPlaceSearchValue,
    }),
    [
      selectedVaccine,
      partnerCode,
      loading,
      supliersCode,
      errorMassage,
      customerId,
      partnerUrl,
      userLocation,
      clientoHashId,
      placeSearchValue,
      language,
    ]
  );
  return (
    <VacciContext.Provider value={providerValue}>
      {children}
    </VacciContext.Provider>
  );
}
ContextProvider.propTypes = { children: PropTypes.node };

export default ContextProvider;
