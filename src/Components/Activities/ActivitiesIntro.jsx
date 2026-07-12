import React from "react";
import { Building2, Globe2, Leaf } from "lucide-react";

const HIGHLIGHTS = [
  {
    value: "16+",
    label: "Countries",
    description: "Cross-border footprint connecting strategic trade lanes across four continents.",
    icon: Globe2,
  },
  {
    value: "65%",
    label: "Low-carbon focus",
    description: "Of our new investments directly support renewable energy and circular solutions.",
    icon: Leaf,
  },
  {
    value: "30+",
    label: "Group companies",
    description: "Operational teams delivering resilient supply chains and advanced technologies.",
    icon: Building2,
  },
];

const ActivitiesIntro = () => {
  return (
    <section className="activities-intro" aria-labelledby="activities-intro-heading">
      <style>{`
        .activities-intro {
          background: linear-gradient(180deg, rgba(16, 163, 167, 0.08), rgba(37, 99, 235, 0.05));
          padding: clamp(48px, 12vw, 96px) 0;
        }

        .activities-intro .container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .activities-intro__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .activities-intro__eyebrow::before,
        .activities-intro__eyebrow::after {
          content: "";
          display: block;
          width: 28px;
          height: 2px;
          background: linear-gradient(135deg, #10a3a7, #2563eb);
          border-radius: 999px;
        }

        .activities-intro__header {
          text-align: center;
          margin: 0 auto clamp(32px, 6vw, 48px);
        }

        .activities-intro__header h2 {
          font-size: clamp(2rem, 4vw, 2.75rem);
          margin-bottom: 16px;
          color: #0f172a;
          font-weight: 800;
        }

        .activities-intro__header p {
          margin: 0 auto;
          color: #475569;
          max-width: 68ch;
          line-height: 1.75;
          font-size: clamp(1rem, 1.6vw, 1.125rem);
        }

        .activities-intro__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(18px, 3vw, 32px);
        }

        .activities-intro__card {
          background: #fff;
          border-radius: 20px;
          padding: clamp(24px, 4vw, 32px);
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .activities-intro__card:hover,
        .activities-intro__card:focus-within {
          transform: translateY(-6px);
          box-shadow: 0 28px 60px rgba(15, 23, 42, 0.12);
        }

        .activities-intro__icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(16, 163, 167, 0.16), rgba(37, 99, 235, 0.16));
          color: #0f172a;
        }

        .activities-intro__value {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 800;
          margin: 0;
          color: #0f172a;
        }

        .activities-intro__label {
          font-size: clamp(1.125rem, 2.4vw, 1.35rem);
          font-weight: 600;
          margin: 0;
          color: #0f172a;
        }

        .activities-intro__description {
          margin: 0;
          color: #475569;
          line-height: 1.7;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
        }

        @media (max-width: 960px) {
          .activities-intro__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .activities-intro__header {
            text-align: left;
          }

          .activities-intro__grid {
            grid-template-columns: 1fr;
          }

          .activities-intro__eyebrow {
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className="container">
        <header className="activities-intro__header">
          <div className="activities-intro__eyebrow">Expanding Impact</div>
          <h2 id="activities-intro-heading">Building resilient, future-ready business verticals</h2>
          <p>
            We invest in asset-light logistics, renewable energy platforms, and value-added distribution
            networks that accelerate the transition toward sustainable trade. Our team partners closely with
            portfolio leaders to unlock scale, digital capabilities, and responsible growth in every market we
            enter.
          </p>
        </header>

        <div className="activities-intro__grid" role="list">
          {HIGHLIGHTS.map(({ value, label, description, icon: Icon }) => (
            <article className="activities-intro__card" key={label} role="listitem">
              <span className="activities-intro__icon" aria-hidden="true">
                <Icon size={26} strokeWidth={2.2} />
              </span>
              <div>
                <p className="activities-intro__value">{value}</p>
                <p className="activities-intro__label">{label}</p>
              </div>
              <p className="activities-intro__description">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesIntro;
