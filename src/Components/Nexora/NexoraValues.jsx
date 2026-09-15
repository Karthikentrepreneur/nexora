import React from 'react';
import { VALUES_NEXORA } from '../../utils/capabilityData';
import { Sparkles, Shield, Zap, Target, Award, Compass, RefreshCw } from 'lucide-react';

const ICONS = [
  Sparkles, // N
  Award,    // E
  Target,   // X
  Shield,   // O
  Compass,  // R
  Zap,      // A
  RefreshCw // 360
];

const NexoraValues = () => {
  return (
    <section className="values-nexora-section py-5 position-relative" id="values">
      <div className="container py-lg-5">
        
        {/* Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-9">
            <span className="nexora-section-badge">OUR CORE VALUES</span>
            <h2 className="nexora-section-title mt-2">
              What <span className="text-gradient-nexora">NEXORA360</span> stands for.
            </h2>
            <p className="nexora-lead-text mx-auto mt-3">
              Seven ideas, spelled out in our own name — the standard every engagement is built against, from a single outsourced process to a full Global Capability Centre.
            </p>
          </div>
        </div>

        {/* 7 Values Grid */}
        <div className="row g-4 justify-content-center mb-5">
          {VALUES_NEXORA.map((val, idx) => {
            const Icon = ICONS[idx] || Sparkles;
            const isLast = val.letter === "360°";
            return (
              <div key={idx} className={isLast ? "col-lg-8 col-md-12" : "col-lg-4 col-md-6"}>
                <div className={`value-card ${isLast ? 'value-card-highlight' : ''}`}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="letter-badge">
                      <span>{val.letter}</span>
                    </div>
                    <div className="value-icon-wrap">
                      <Icon size={22} className="text-danger" />
                    </div>
                  </div>
                  <h3 className="value-title">{val.title}</h3>
                  <p className="value-desc">{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Banner & Motto */}
        <div className="values-motto-banner text-center p-4 p-lg-5 position-relative overflow-hidden">
          <div className="motto-glow" aria-hidden="true"></div>
          <div className="position-relative" style={{ zIndex: 2 }}>
            <p className="values-summary-text mx-auto mb-4">
              Nexora360 combines innovation, agility, excellence, ownership, reliability, execution and continuous optimization to help businesses adapt, perform better and grow faster.
            </p>
            <div className="motto-divider mx-auto mb-4"></div>
            <h3 className="motto-headline">
              THINK NEXT. EXECUTE BETTER. OPTIMIZE EVERYTHING. DELIVER EXCELLENCE.
            </h3>
          </div>
        </div>

      </div>

      <style>{`
        .values-nexora-section {
          background: #FAFAFA;
          color: #0F172A;
          overflow: hidden;
          border-top: 1px solid #F1F5F9;
        }
        .value-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 30px 26px;
          height: 100%;
          transition: all 0.35s ease;
          position: relative;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);
        }
        .value-card:hover {
          transform: translateY(-6px);
          border-color: #FCA5A5;
          box-shadow: 0 16px 36px rgba(220, 38, 38, 0.09);
        }
        .value-card-highlight {
          background: linear-gradient(135deg, #FFF7ED 0%, #FEF2F2 100%);
          border: 1.5px solid #FDBA74;
        }
        .letter-badge {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: linear-gradient(135deg, #DC2626 0%, #FF5722 50%, #F97316 100%);
          color: #FFFFFF;
          font-size: 22px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3);
        }
        .value-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(220, 38, 38, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .value-title {
          font-size: 20px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 10px;
        }
        .value-desc {
          color: #64748B;
          font-size: 15px;
          line-height: 1.65;
          margin-bottom: 0;
        }
        .values-motto-banner {
          background: #0B0F17;
          border-radius: 20px;
          border: 1px solid rgba(220, 38, 38, 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        }
        .motto-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(50px);
        }
        .values-summary-text {
          color: #E2E8F0;
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          line-height: 1.7;
          max-width: 820px;
          font-weight: 500;
        }
        .motto-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #DC2626, #F97316);
          border-radius: 2px;
        }
        .motto-headline {
          font-size: clamp(1.1rem, 2vw, 1.6rem);
          font-weight: 900;
          letter-spacing: 1.5px;
          color: #FFFFFF;
          margin-bottom: 0;
          background: linear-gradient(135deg, #FFFFFF 0%, #FED7AA 50%, #FF8A65 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default NexoraValues;
