import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Truck, Leaf, Package, Code, ShieldCheck } from "lucide-react";
import { getNavbarVerticals } from "../../utils/navbarVerticalData";

/* ---------- HELPERS ---------- */
const openLink = (url) => {
  if (typeof window !== "undefined" && url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

const getIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("shipping") || t.includes("logistics") || t.includes("supply chain")) {
    return <Truck size={22} strokeWidth={2.2} color="#fff" />;
  }
  if (t.includes("renewable") || t.includes("sustainability") || t.includes("energy")) {
    return <Leaf size={22} strokeWidth={2.2} color="#fff" />;
  }
  if (t.includes("distribution") || t.includes("product")) {
    return <Package size={22} strokeWidth={2.2} color="#fff" />;
  }
  if (t.includes("software") || t.includes("development") || t.includes("tech")) {
    return <Code size={22} strokeWidth={2.2} color="#fff" />;
  }
  return <ShieldCheck size={22} strokeWidth={2.2} color="#fff" />;
};

const getLogos = (title) => {
  const t = title.toLowerCase();
  if (t.includes("shipping") || t.includes("logistics") || t.includes("supply chain")) {
    return [
      { img: "/logosss01.png", alt: "GGL", link: "https://www.ggl.sg/" },
      { img: "/logosss03.png", alt: "OECL", link: "https://www.oecl.sg/" },
      { img: "/logosss02.png", alt: "Global Consol", link: "https://www.globalconsol.com/" },
      { img: "/Haixun_logo.png", alt: "Hai Xun", link: "https://haixun.co/" },
      { img: "/one.png", alt: "ONE Global Logistics", link: "https://oneglobalqatar.com/" },
      { img: "/logo-2.png", alt: "Future Net Logistics", link: "https://futurenetlogistics.com" },
    ];
  }
  if (t.includes("renewable") || t.includes("energy") || t.includes("sustainability")) {
    return [
      { img: "/logosss04.png", alt: "Moltech", link: "https://moltechglobal.com/" },
      { img: "/molgen.png", alt: "MoltechGen", link: "https://moltechglobal.com/" },
      { img: "/superenergy.png", alt: "Super Energy", link: "https://www.superenergy.sg/" },
    ];
  }
  if (t.includes("distribution") || t.includes("product")) {
    return [{ img: "/logosss05.png", alt: "CityGn", link: "https://citygnenergy.com/" }];
  }
  return [];
};

/* ---------- COMPONENT ---------- */
export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getNavbarVerticals().then((data) => {
      if (data) {
        // Only show active verticals
        setServices(data.filter((item) => Number(item.is_active) === 1));
      }
    });
  }, []);

  return (
    <section className="services-section">
      <style>{`
        .services-section {
          background: #fff;
          --ink: #0f172a;
          --muted: #475569;
          --teal: #10a3a7;
          --blue: #2563eb;
          --bg1: #f6faff;
          --bg2: #f3fbfc;
          --logoH: 90px;
          --logoH-sm: 70px;
        }

        .services-section .slice {
          position: relative;
          padding: clamp(40px, 5vw, 80px) 0;
          background: var(--bg1);
        }
        .services-section .slice.alt { background: var(--bg2); }

        .services-section .container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .services-section .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: clamp(22px, 4vw, 44px);
        }
        .services-section .row.rev .media { order: 2; }
        .services-section .row.rev .content { order: 1; }

        .services-section .media {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        }
        .services-section .media img {
          width: 100%;
          height: 100%;
          max-height: 420px;
          object-fit: cover;
          transition: transform .6s ease;
        }
        .services-section .media:hover img { transform: scale(1.035); }

        .services-section .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .services-section .title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .services-section .bubble {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--blue));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 8px 18px rgba(16, 163, 167, 0.22);
        }
        .services-section .title h3 {
          margin: 0;
          color: var(--ink);
          font-weight: 900;
          font-size: clamp(20px, 1.9vw, 26px);
        }
        .services-section .desc {
          color: var(--muted);
          line-height: 1.7;
          font-size: clamp(15px, 1vw, 17px);
          margin-bottom: 18px;
        }

        .services-section .logos {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 24px;
          margin-top: 16px;
        }

        .services-section .logo {
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .services-section .logo:hover {
          transform: scale(1.08);
          filter: brightness(1.1);
        }
        .services-section .logo img {
          max-height: var(--logoH);
          width: auto;
          object-fit: contain;
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }

        .services-section .btn-read-more:hover span {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .services-section .row {
            grid-template-columns: 1fr;
          }
          .services-section .row.rev .media {
            order: 1;
          }
          .services-section .row.rev .content {
            order: 2;
          }
        }

        @media (max-width: 768px) {
          .services-section {
            --logoH: var(--logoH-sm);
          }
        }
      `}</style>

      {services.map((s, i) => (
        <div className={`slice ${i % 2 ? "alt" : ""}`} key={s.id || s.title}>
          <div className="container">
            <div className={`row ${i % 2 ? "rev" : ""}`}>
              <figure className="media">
                <img src={s.image_src} alt={`${s.title} cover`} loading="lazy" />
              </figure>
              <div className="content">
                <div className="title">
                  <span className="bubble">{getIcon(s.title)}</span>
                  <h3>{s.title}</h3>
                </div>
                <div className="desc">
                  {s.content ? s.content.split("\n\n").map((para, idx) => (
                    <p key={idx} style={{ marginBottom: "12px" }}>{para}</p>
                  )) : ""}
                </div>
                {getLogos(s.title).length > 0 && (
                  <div className="logos" style={{ marginBottom: "20px" }}>
                    {getLogos(s.title).map((L, idx) => (
                      <button key={idx} className="logo" onClick={() => openLink(L.link)}>
                        <img src={L.img} alt={L.alt} loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
