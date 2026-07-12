import { useEffect, useState } from "react";
import { RefreshCw, Maximize2, Minimize2 } from "lucide-react";

const MY_MAP_URL =
  "https://www.google.com/maps/d/u/0/embed?mid=1CGPTRpMsSQAva-KitDXZTYiMv1mHnDA";

// Simple dynamic Google Maps embed builder
const buildSimpleEmbedUrl = ({ lat, lng, zoom }) =>
  `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

const ContactMapContainer = ({
  coordinates = null,
  selectedCity,
  hideChrome = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mapVersion, setMapVersion] = useState(0);
  const [mapType, setMapType] = useState("auto"); // "auto" | "custom"

  // Compute which map URL to show
  const mapUrl = coordinates
    ? buildSimpleEmbedUrl(coordinates)
    : MY_MAP_URL + `&v=${mapVersion}`;

  useEffect(() => {
    setIsLoaded(false);
    setMapVersion((v) => v + 1);
    setMapType(coordinates ? "auto" : "custom");
  }, [coordinates]);

  return (
    <div className={`global-map-card${isFullScreen ? " fullscreen" : ""}`}>
      {!hideChrome && (
        <div className="global-map-header">
          <div>
            <h3>
              {mapType === "custom"
                ? "Interactive Global Presence Map"
                : "Location Map"}
            </h3>
            {selectedCity && (
              <p>
                Viewing: <span>{selectedCity.name}</span>
              </p>
            )}
          </div>
          <div className="global-map-actions">
            <button onClick={() => setMapVersion((v) => v + 1)}>
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button onClick={() => setIsFullScreen((f) => !f)}>
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              <span>{isFullScreen ? "Compact" : "Expand"}</span>
            </button>
          </div>
        </div>
      )}

      <div className="global-map-frame">
        {!isLoaded && (
          <div className="global-map-loading">
            <div className="spinner" />
            <p>Loading map...</p>
          </div>
        )}

        {/* Dynamically switch map source */}
        <iframe
          key={mapVersion}
          src={mapUrl}
          title="Global Map"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <style>{`
        .global-map-card { 
          border-radius: 0;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
          border: none;
        }

        .global-map-header {
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:14px 16px;
          color:var(--theme-2);
          background:transparent;
        }

        .global-map-header h3 { 
          margin:0; 
          font-size:1rem; 
          font-weight:600; 
          color:var(--theme-2); 
        }

        .global-map-header span { 
          font-weight:600; 
          color:var(--theme); 
        }

        .global-map-actions button {
          display:inline-flex;
          align-items:center;
          gap:8px;
          margin-left:8px;
          border:1px solid var(--theme);
          border-radius:8px;
          padding:6px 10px;
          background:rgba(28, 168, 203, 0.08);
          color:var(--theme-2);
          cursor:pointer;
          font-size:0.85rem;
          transition: all 0.2s ease-in-out;
        }

        .global-map-actions button:hover { 
          background:var(--theme); 
          color:#fff; 
        }

        .global-map-frame { 
          position:relative; 
          height:520px; 
          margin:0; 
          padding:0; 
          background: transparent;
          border: none;
        }

        .global-map-frame iframe { 
          width:100%; 
          height:100%; 
          border: none; 
          display:block; 
          background: transparent;
        }

        .global-map-loading { 
          position:absolute; 
          inset:0; 
          display:grid; 
          place-items:center; 
          background:transparent; 
        }

        .global-map-card.fullscreen { 
          position:fixed; 
          inset:16px; 
          z-index:1000; 
          background:transparent; 
        }

        .global-map-card.fullscreen .global-map-frame { 
          height: calc(100% - 96px); 
        }

        @media (max-width: 991px) { 
          .global-map-frame { height:420px; } 
        }
      `}</style>
    </div>
  );
};

export default ContactMapContainer;
