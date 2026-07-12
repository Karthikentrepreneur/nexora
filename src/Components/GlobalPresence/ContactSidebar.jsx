// src/Components/GlobalPresence/ContactSidebar.jsx
import { useMemo } from "react";
import { MapPin, Phone, Mail, Home, ChevronRight, Globe } from "lucide-react";

/* -------------------- Local flag assets (ISO2 → SVG) -------------------- */
/* Use relative paths since @ alias isn't set */
import ae from "../../assets/flags/ae.svg";
import au from "../../assets/flags/au.svg";
import cn from "../../assets/flags/cn.svg";
import gb from "../../assets/flags/gb.svg";
import id from "../../assets/flags/id.svg";
import _in from "../../assets/flags/in.svg"; // alias because "in" can be awkward in TS contexts
import lk from "../../assets/flags/lk.svg";
import mm from "../../assets/flags/mm.svg";
import my from "../../assets/flags/my.svg";
import qa from "../../assets/flags/qa.svg";
import sa from "../../assets/flags/sa.svg";
import sg from "../../assets/flags/sg.svg";
import pk from "../../assets/flags/pk.svg";
// If you had "th (1).svg", delete/rename it and keep only "th.svg".
import th from "../../assets/flags/th.svg";
import us from "../../assets/flags/us.svg";

/* Local-first flag map; keys must be lowercase ISO-2 country codes */
const FLAG_SRC_MAP = {
  ae, au, cn, gb, id, in: _in, lk, mm, my, qa, sa, sg, th, us, pk,
};

/* Ultra-small inline fallback */
const FALLBACK_FLAG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='18' viewBox='0 0 24 18'%3E%3Crect width='24' height='18' rx='3' fill='%23E2E8F0'/%3E%3Cpath d='M12 5.25c1.794 0 3.25 1.456 3.25 3.25S13.794 11.75 12 11.75 8.75 10.294 8.75 8.5 10.206 5.25 12 5.25Z' fill='%2328A8CB'/%3E%3C/svg%3E";

/* Prefer local SVGs, then FlagCDN, then fallback */
const buildCountryFlagAsset = (code = "") => {
  if (typeof code !== "string" || code.length !== 2) {
    return { src: FALLBACK_FLAG };
  }
  const normalized = code.toLowerCase();

  // 1) Local asset if present
  if (FLAG_SRC_MAP[normalized]) {
    return { src: FLAG_SRC_MAP[normalized] };
  }

  // 2) Remote FlagCDN as a backup (kept 1x/2x pair)
  return {
    src: `https://flagcdn.com/w24/${normalized}.png`,
    srcSet: `https://flagcdn.com/w48/${normalized}.png 2x`,
  };
};

const handleFlagError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = FALLBACK_FLAG;
  event.currentTarget.removeAttribute("srcset");
};

const formatContacts = (contacts = []) => contacts.filter(Boolean).join(" \u2022 ");

/* Compute center & bounds for a country's city list */
const getCountryView = (country) => {
  const cities = country?.cities ?? [];
  if (!cities.length) return null;

  let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;

  cities.forEach((c) => {
    if (typeof c.lat === "number" && typeof c.lng === "number") {
      minLat = Math.min(minLat, c.lat);
      maxLat = Math.max(maxLat, c.lat);
      minLng = Math.min(minLng, c.lng);
      maxLng = Math.max(maxLng, c.lng);
    }
  });

  const center = {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2,
  };

  const latSpan = Math.max(0.00001, maxLat - minLat);
  const lngSpan = Math.max(0.00001, maxLng - minLng);
  const span = Math.max(latSpan, lngSpan);

  let suggestedZoom = 4;
  if (span < 0.05) suggestedZoom = 12;
  else if (span < 0.1) suggestedZoom = 11;
  else if (span < 0.2) suggestedZoom = 10;
  else if (span < 0.4) suggestedZoom = 9;
  else if (span < 0.8) suggestedZoom = 8;
  else if (span < 1.6) suggestedZoom = 7;
  else if (span < 3.2) suggestedZoom = 6;
  else if (span < 6.4) suggestedZoom = 5;
  else suggestedZoom = 4;

  const bounds = { minLat, maxLat, minLng, maxLng };
  return { center, bounds, suggestedZoom };
};

const ContactSidebar = ({
  countries,
  expandedCountry,
  onToggleCountry,
  onSelectCity,
  selectedCity,
  selectedCountryCode,
  // called when user clicks a country (so you can move the map)
  onFocusCountry, // (payload: { center, bounds, suggestedZoom, country }) => void
}) => {
  const selectedCityKey = selectedCity ? `${selectedCity.name}-${selectedCity.lat}-${selectedCity.lng}` : "";

  const emptyState = useMemo(
    () => !countries || countries.length === 0,
    [countries]
  );

  if (emptyState) {
    return (
      <div className="global-sidebar-card">
        <div className="global-sidebar-header">
          <Globe size={18} />
          <h3>Global Locations</h3>
        </div>
        <div className="global-sidebar-empty">
          <p>Location data is currently unavailable. Please try again later.</p>
        </div>
      </div>
    );
  }

  const handleCountryClick = (country) => {
    onToggleCountry?.(country.code);
    if (typeof onFocusCountry === "function") {
      const view = getCountryView(country);
      if (view) {
        onFocusCountry({ ...view, country });
      }
    }
  };

  return (
    <div className="global-sidebar-card">
      <div className="global-sidebar-header">
        <Globe size={18} />
        <h3>Global Locations</h3>
      </div>

      <div className="global-sidebar-content">
        {countries.map((country) => {
          const isExpanded = expandedCountry === country.code;
          const isSelectedCountry = selectedCountryCode === country.code;
          const flagAsset = buildCountryFlagAsset(country.code);

          return (
            <div className="global-country" key={country.code}>
              <button
                type="button"
                className={`global-country-trigger${isExpanded ? " expanded" : ""}${isSelectedCountry ? " is-selected" : ""}`}
                onClick={() => handleCountryClick(country)}
                aria-expanded={isExpanded}
              >
                <span className="global-country-identity">
                  <img
                    className="global-country-flag"
                    src={flagAsset.src}
                    srcSet={flagAsset.srcSet}
                    loading="lazy"
                    decoding="async"
                    alt={`${country.name} flag`}
                    onError={handleFlagError}
                  />
                  <span className="global-country-name">{country.name}</span>
                </span>
                <ChevronRight className="global-country-icon" size={18} />
              </button>

              {isExpanded && (
                <div className="global-city-list">
                  {country.cities.map((city) => {
                    const cityKey = `${city.name}-${city.lat}-${city.lng}`;
                    const isActive = cityKey === selectedCityKey;
                    return (
                      <div className="global-city-item" key={cityKey}>
                        <button
                          type="button"
                          className={`global-city-button${isActive ? " active" : ""}`}
                          onClick={() => onSelectCity?.(country.code, city)}
                        >
                          <MapPin size={16} />
                          <span>{city.name}</span>
                        </button>

                        {isActive && (
                          <div className="global-city-details">
                            {city.address && (
                              <div className="global-city-detail-row">
                                <Home size={16} />
                                <p>{city.address}</p>
                              </div>
                            )}
                            {Array.isArray(city.contacts) && city.contacts.length > 0 && (
                              <div className="global-city-detail-row">
                                <Phone size={16} />
                                <p>{formatContacts(city.contacts)}</p>
                              </div>
                            )}
                            {city.email && (
                              <div className="global-city-detail-row">
                                <Mail size={16} />
                                <a href={`mailto:${city.email}`}>{city.email}</a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactSidebar;
