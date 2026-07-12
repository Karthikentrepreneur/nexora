import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import ContactMapContainer from "../Components/GlobalPresence/ContactMapContainer";
import ContactSidebar from "../Components/GlobalPresence/ContactSidebar";
import { getGlobalPresence } from "../utils/globalPresenceData";
import useIsMobile from "../hooks/useIsMobile";
import useSEO from "../hooks/useSEO";
import "../assets/global-presence.css";

const GlobalPresencePage = () => {
  useSEO('global_presence');
  const location = useLocation();
  const isMobile = useIsMobile();
  const isIndiaPage = useMemo(
    () => location.pathname.toLowerCase().includes("india"),
    [location.pathname]
  );

  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    getGlobalPresence().then((data) => {
      if (data) {
        setAllCountries(data);
      }
    });
  }, []);

  const countries = useMemo(() => {
    const filtered = allCountries.filter(
      (country) => !(isIndiaPage && country.code === "pk")
    );
    return [...filtered].sort((a, b) => {
      const priorityA = a.priority ?? 1;
      const priorityB = b.priority ?? 1;
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return a.name.localeCompare(b.name);
    });
  }, [allCountries, isIndiaPage]);

  const [expandedCountry, setExpandedCountry] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [mobileView, setMobileView] = useState("sidebar");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const countryParam = searchParams.get("country");

    if (countryParam && countries.length) {
      const selected = countries.find(
        (c) => c.code.toLowerCase() === countryParam.toLowerCase()
      );
      if (selected) {
        setExpandedCountry(selected.code);
        setSelectedCountryCode(selected.code);
        setSelectedCity(selected.cities?.[0] ?? null);
        return;
      }
    }

    if (countries.length) {
      setExpandedCountry(countries[0].code);
      setSelectedCountryCode(countries[0].code);
      setSelectedCity(countries[0].cities[0]);
    }
  }, [location.search, countries]);

  useEffect(() => {
    if (!isMobile) {
      setMobileView("combined");
    } else if (mobileView === "combined") {
      setMobileView("sidebar");
    }
  }, [isMobile, mobileView]);

  const handleToggleCountry = (code) => {
    if (expandedCountry === code) {
      setExpandedCountry(null);
      return;
    }

    setExpandedCountry(code);
    setSelectedCountryCode(code);

    const country = countries.find((item) => item.code === code);
    if (country?.cities?.length) {
      setSelectedCity(country.cities[0]);
    } else {
      setSelectedCity(null);
    }
  };

  const handleSelectCity = (countryCode, city) => {
    setExpandedCountry(countryCode);
    setSelectedCountryCode(countryCode);
    setSelectedCity(city);
  };

  const coordinates = useMemo(() => {
    if (selectedCity) {
      return {
        lat: selectedCity.lat,
        lng: selectedCity.lng,
        zoom: 11,
      };
    }
    const fallbackCountry = countries.find((item) => item.code === selectedCountryCode);
    if (fallbackCountry) {
      return { lat: fallbackCountry.lat, lng: fallbackCountry.lng, zoom: 5 };
    }
    return { lat: 1.3521, lng: 103.8198, zoom: 3 };
  }, [countries, selectedCity, selectedCountryCode]);

  return (
    <div className="global-presence-page">
      {isMobile && (
        <div className="global-mobile-toggle">
          <button
            type="button"
            className={mobileView === "sidebar" ? "active" : ""}
            onClick={() => setMobileView("sidebar")}
          >
            Locations
          </button>
          <button
            type="button"
            className={mobileView === "map" ? "active" : ""}
            onClick={() => setMobileView("map")}
          >
            Map
          </button>
        </div>
      )}

      <section className="global-presence-layout">
        <div
          className={`global-map-section${
            isMobile && mobileView !== "map" ? " hidden-mobile" : ""
          }`}
        >
          <ContactMapContainer
            coordinates={coordinates}
            selectedCity={selectedCity}
          />
        </div>
        <div
          className={`global-sidebar-section${
            isMobile && mobileView !== "sidebar" ? " hidden-mobile" : ""
          }`}
        >
          <ContactSidebar
            countries={countries}
            expandedCountry={expandedCountry}
            onToggleCountry={handleToggleCountry}
            onSelectCity={handleSelectCity}
            selectedCity={selectedCity}
            selectedCountryCode={selectedCountryCode}
          />
        </div>
      </section>
    </div>
  );
};

export default GlobalPresencePage;
