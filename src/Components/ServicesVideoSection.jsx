import React, { useEffect, useState } from "react";
import { Workflow, Droplets, Sun } from "lucide-react";
import { getServicesVideoDetails } from "../utils/servicesVideoData";

const SERVICES = [
  { title: "Supply Chain Solutions", Icon: Workflow },
  { title: "Renewable Energy", Icon: Sun },
  { title: "Product Distribution", Icon: Droplets },
];

const ServicesVideoSection = () => {
  const [svsData, setSvsData] = useState(null);

  useEffect(() => {
    getServicesVideoDetails().then((data) => setSvsData(data));
  }, []);

  if (!svsData) return null;

  const { video_src: videoSrc, heading, subheading } = svsData;
  return (
    <section className="svs-section">
      <div className="svs-container">
        {/* LEFT */}
        <div className="svs-left">
          <header className="svs-header">
            <p className="svs-sub">{subheading}</p>
            <h2 className="svs-title">{heading}</h2>
          </header>

          <div className="svs-list">
            {SERVICES.map(({ title, Icon }) => (
              <div className="svs-item" key={title}>
                <div className="svs-icon">
                  <Icon strokeWidth={1.8} />
                </div>
                <div className="svs-item-title">{title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — VIDEO */}
        <div className="svs-right">
          <div className="svs-video">
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Business Verticals Video"
            />
          </div>
        </div>
      </div>

      <style>{`
        .svs-section {
          background: #fff;
          padding: 70px 0;
        }

        .svs-container {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          width: min(1400px, 94%);
          margin: 0 auto;
          align-items: center;
          gap: 28px;
        }

        /* LEFT SIDE */
        .svs-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .svs-header {
          margin-bottom: 10px;
        }

        .svs-sub {
          margin: 0;
          font-size: 0.9rem;
          color: #5f6b7a;
        }

        .svs-title {
          margin: 4px 0;
          font-size: clamp(2rem, 1.2rem + 2vw, 2.6rem);
          font-weight: 800;
          color: #0E0F2C;
          line-height: 1.1;
        }

        /* Tighter List */
        .svs-list {
          display: flex;
          flex-direction: column;
          gap: 6px; /* minimal vertical space */
          margin-top: 10px;
          max-width: 460px;
        }

        .svs-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px; /* very compact */
          border: 1px solid #e6edf5;
          border-radius: 8px;
          background: #f8fcff;
          transition: all 0.2s ease;
        }

        .svs-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(10, 40, 80, 0.08);
          border-color: #c9e4f5;
          background: #f4fbff;
        }

        .svs-icon {
          flex: 0 0 34px;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          background: rgba(38, 182, 224, 0.12);
          border: 1px solid rgba(38, 182, 224, 0.35);
          color: #1c99bf;
        }

        .svs-icon svg {
          width: 16px;
          height: 16px;
        }

        .svs-item-title {
          font-weight: 600;
          color: #0E0F2C;
          font-size: 0.9rem;
          line-height: 1.3;
        }

        /* RIGHT SIDE — BIGGER 16:9 VIDEO */
        .svs-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .svs-video {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
        }

        .svs-video video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* RESPONSIVE */
        @media (min-width: 1536px) {
          .svs-container {
            grid-template-columns: 0.7fr 1.3fr;
          }
        }

        @media (max-width: 1024px) {
          .svs-container {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .svs-right {
            order: -1;
          }
          .svs-video {
            border-radius: 12px;
          }
          .svs-left {
            align-items: center;
            text-align: center;
          }
          .svs-list {
            max-width: 400px;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .svs-section {
            padding: 50px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesVideoSection;
