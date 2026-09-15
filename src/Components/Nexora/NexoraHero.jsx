import React from 'react';
import { Link } from 'react-router';
import Header3 from '../Header/Header3';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

const ECOSYSTEM_TAGS = [
  "GCC",
  "BPO",
  "Digital Marketing",
  "Digital Sales",
  "Customer Experience",
  "KPO",
  "HR & Recruitment",
  "Finance",
  "Administration",
  "Data Management",
  "AI & Automation"
];

const NexoraHero = () => {
  return (
    <section className="hero-section position-relative" id="hero">
      <Header3 variant="header-transparent" />

      <div className="hero-nexora">
        {/* Background Overlay & Red-Orange Ambient Glow */}
        <div className="hero-backdrop" aria-hidden="true">
          <div className="glow-sphere-1"></div>
          <div className="glow-sphere-2"></div>
          <div className="hero-grid-pattern"></div>
        </div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center min-vh-hero">
            <div className="col-xl-9 col-lg-10 mx-auto text-center hero-text-wrapper">
              
              {/* Eyebrow Badge */}
              <div className="hero-eyebrow-wrap mb-4">
                <span className="hero-badge">
                  <Sparkles size={15} className="text-warning me-2 animate-pulse" />
                  Nexora360 Global Solutions Private Limited
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="hero-headline">
                One partner. <br />
                <span className="text-gradient-nexora">Every business need.</span>
              </h1>

              {/* Lead Description */}
              <p className="hero-subtext mx-auto">
                A next-generation global business services and capability partner — bringing GCC, BPO, KPO, digital, customer experience, IT, HR, finance and AI &amp; automation together under one integrated ecosystem.
              </p>

              {/* CTA Action Buttons */}
              <div className="hero-actions d-flex justify-content-center align-items-center gap-3 flex-wrap mt-4 mb-5">
                <a href="#capabilities" className="btn-nexora-primary hero-btn">
                  <span>Explore capabilities</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#contact" className="btn-nexora-secondary hero-btn">
                  <span>Start a conversation</span>
                </a>
              </div>

              {/* 360° ECOSYSTEM Strip */}
              <div className="hero-ecosystem-container mt-4">
                <div className="ecosystem-header d-flex align-items-center justify-content-center gap-2 mb-3">
                  <Layers size={16} className="text-warning" />
                  <span className="ecosystem-title">NEXORA360 &bull; 360° ECOSYSTEM</span>
                </div>
                
                <div className="ecosystem-tags-scroller">
                  <div className="ecosystem-tags-track">
                    {ECOSYSTEM_TAGS.concat(ECOSYSTEM_TAGS).map((tag, idx) => (
                      <span key={idx} className="ecosystem-chip">
                        <span className="chip-dot"></span>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-nexora {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          background: #0B0F17;
          overflow: hidden;
          padding: 140px 0 80px;
        }
        .min-vh-hero {
          min-height: calc(92vh - 200px);
        }
        .hero-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .glow-sphere-1 {
          position: absolute;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.28) 0%, rgba(220, 38, 38, 0.05) 50%, transparent 70%);
          top: -10%;
          left: 15%;
          filter: blur(60px);
          animation: floatGlow 14s infinite alternate ease-in-out;
        }
        .glow-sphere-2 {
          position: absolute;
          width: 650px;
          height: 650px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.22) 0%, rgba(255, 87, 34, 0.04) 50%, transparent 70%);
          bottom: -15%;
          right: 10%;
          filter: blur(70px);
          animation: floatGlow 18s infinite alternate-reverse ease-in-out;
        }
        .hero-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.6;
        }
        @keyframes floatGlow {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.1); }
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 20px;
          border-radius: 9999px;
          background: rgba(220, 38, 38, 0.12);
          border: 1px solid rgba(249, 115, 22, 0.35);
          color: #FFEDD5;
          font-size: clamp(12px, 1.2vw, 14px);
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.2);
          backdrop-filter: blur(10px);
        }
        .hero-headline {
          color: #FFFFFF;
          font-size: clamp(2.4rem, 5vw + 1rem, 4.4rem);
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .hero-subtext {
          color: #CBD5E1;
          font-size: clamp(1.05rem, 1.3vw, 1.25rem);
          line-height: 1.68;
          max-width: 820px;
          font-weight: 400;
        }
        .hero-btn {
          font-size: 16px;
          padding: 15px 32px;
        }
        .hero-ecosystem-container {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px 24px;
          backdrop-filter: blur(12px);
          overflow: hidden;
        }
        .ecosystem-title {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #F97316;
          text-transform: uppercase;
        }
        .ecosystem-tags-scroller {
          overflow: hidden;
          width: 100%;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .ecosystem-tags-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: tickerSlide 35s linear infinite;
        }
        .ecosystem-tags-track:hover {
          animation-play-state: paused;
        }
        @keyframes tickerSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ecosystem-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(249, 115, 22, 0.25);
          color: #F8FAFC;
          font-size: 13.5px;
          font-weight: 600;
          padding: 7px 16px;
          border-radius: 9999px;
          white-space: nowrap;
          transition: all 0.25s ease;
        }
        .ecosystem-chip:hover {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(249, 115, 22, 0.25) 100%);
          border-color: #FF5722;
          color: #FFEDD5;
          transform: translateY(-2px);
        }
        .chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF5722;
          box-shadow: 0 0 8px #FF5722;
        }
        @media (max-width: 768px) {
          .hero-nexora {
            padding: 120px 0 60px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default NexoraHero;
