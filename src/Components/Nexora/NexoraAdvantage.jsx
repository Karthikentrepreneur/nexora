import React, { useState } from 'react';
import { ECOSYSTEM_NODES } from '../../utils/capabilityData';
import { Check, Layers, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const NexoraAdvantage = () => {
  const [selectedNode, setSelectedNode] = useState(ECOSYSTEM_NODES[0]);

  return (
    <section className="advantage-nexora-section py-5 position-relative" id="advantage">
      <div className="container py-lg-5">
        
        {/* Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-9">
            <span className="nexora-section-badge">THE NEXORA360 360° ADVANTAGE</span>
            <h2 className="nexora-section-title mt-2">
              One partner. Multiple capabilities. <br />
              <span className="text-gradient-nexora">One integrated ecosystem.</span>
            </h2>
            <p className="nexora-lead-text mx-auto mt-3">
              What makes Nexora360 different is that clients don't need multiple outsourcing partners for different functions. Every capability connects into the same operating model, the same reporting line, and the same point of accountability.
            </p>
          </div>
        </div>

        {/* Interactive 360° Ecosystem Orbit / Wheel Display */}
        <div className="ecosystem-wheel-wrapper p-4 p-lg-5 mb-5">
          <div className="row align-items-center g-5">
            
            {/* Left side: Interactive circular grid of the 10 capabilities */}
            <div className="col-lg-7">
              <div className="orbit-grid-container">
                <div className="orbit-center-core">
                  <div className="core-inner">
                    <span className="core-eyebrow">NEXORA360</span>
                    <h3 className="core-title">ONE ECOSYSTEM</h3>
                    <span className="core-dot-indicator"></span>
                  </div>
                </div>

                <div className="row g-2 nodes-grid">
                  {ECOSYSTEM_NODES.map((node) => {
                    const isSelected = selectedNode.id === node.id;
                    return (
                      <div key={node.id} className="col-sm-6 col-12">
                        <div 
                          className={`node-pill ${isSelected ? 'node-pill-active' : ''}`}
                          onClick={() => setSelectedNode(node)}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="node-number">{node.id}</span>
                          <span className="node-name">{node.name}</span>
                          <span className="node-active-indicator"></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="wheel-footer-note mt-3 text-center text-lg-start">
                <p className="text-slate-400 mb-0" style={{ color: '#94A3B8', fontSize: '14px' }}>
                  Ten capabilities, one shared operating model — start anywhere on the wheel and everything else is already connected.
                </p>
              </div>
            </div>

            {/* Right side: Focused node inspection card & Core Philosophy */}
            <div className="col-lg-5">
              <div className="node-inspector-card">
                <div className="inspector-eyebrow d-flex align-items-center gap-2 mb-2">
                  <span className="badge-tag">ACTIVE NODE: #{selectedNode.id}</span>
                  <span className="badge-live">CONNECTED</span>
                </div>

                <h3 className="inspector-title mb-2">{selectedNode.name}</h3>
                <p className="inspector-full-name text-danger fw-bold mb-3">{selectedNode.full}</p>

                <p className="inspector-text mb-4">
                  Integrated directly into the unified Nexora360 command structure. Shares common security governance, cross-functional reporting lines, and unified communication protocols.
                </p>

                <div className="integrated-benefits mb-4">
                  <div className="benefit-row d-flex align-items-center gap-2 mb-2">
                    <Check size={16} className="text-danger" />
                    <span>Zero vendor fragmentation or finger-pointing</span>
                  </div>
                  <div className="benefit-row d-flex align-items-center gap-2 mb-2">
                    <Check size={16} className="text-danger" />
                    <span>Single SLA and consolidated performance metrics</span>
                  </div>
                  <div className="benefit-row d-flex align-items-center gap-2">
                    <Check size={16} className="text-danger" />
                    <span>Cross-department knowledge sharing &amp; synergy</span>
                  </div>
                </div>

                <Link to="/contact" className="btn-nexora-primary w-100 justify-content-center">
                  <span>Connect this capability</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* You Focus on Your Core Business Banner */}
        <div className="advantage-focus-banner text-center p-4 p-lg-5">
          <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle bg-danger bg-opacity-10 text-danger mb-3">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-white fw-bold mb-3 fs-3">
            You focus on your core business. <br className="d-none d-sm-block" />
            <span className="text-gradient-nexora">We take care of the capabilities that keep it moving.</span>
          </h3>
          <p className="text-slate-300 mx-auto mb-4" style={{ color: '#CBD5E1', maxWidth: '700px', fontSize: '16px' }}>
            Eliminate the hassle of juggling 5 different agencies, vendors, and contractors. Partner with an integrated power-house engineered for operational excellence.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="#contact" className="btn-nexora-primary">
              <span>Start an engagement</span>
              <ArrowRight size={17} />
            </a>
            <Link to="/about" className="btn-nexora-secondary">
              <span>Learn our methodology</span>
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        .advantage-nexora-section {
          background: #0B0F17;
          color: #FFFFFF;
          overflow: hidden;
          position: relative;
        }
        .advantage-nexora-section .nexora-section-badge {
          background: rgba(220, 38, 38, 0.15);
          color: #F87171;
          border-color: rgba(220, 38, 38, 0.3);
        }
        .advantage-nexora-section .nexora-section-title {
          color: #FFFFFF;
        }
        .advantage-nexora-section .nexora-lead-text {
          color: #94A3B8;
        }
        .ecosystem-wheel-wrapper {
          background: #111827;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }
        .orbit-grid-container {
          position: relative;
        }
        .orbit-center-core {
          text-align: center;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(249, 115, 22, 0.15) 100%);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .core-eyebrow {
          display: block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #F97316;
        }
        .core-title {
          font-size: 20px;
          font-weight: 900;
          color: #FFFFFF;
          margin: 4px 0 0;
          letter-spacing: 1px;
        }
        .node-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }
        .node-pill:hover {
          background: rgba(220, 38, 38, 0.1);
          border-color: rgba(249, 115, 22, 0.4);
          transform: translateY(-2px);
        }
        .node-pill-active {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(249, 115, 22, 0.2) 100%);
          border-color: #FF5722;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.25);
        }
        .node-number {
          font-size: 14px;
          font-weight: 800;
          color: #F87171;
          font-family: monospace;
        }
        .node-name {
          font-size: 14px;
          font-weight: 700;
          color: #F1F5F9;
          flex-grow: 1;
        }
        .node-active-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: transparent;
        }
        .node-pill-active .node-active-indicator {
          background: #FF5722;
          box-shadow: 0 0 10px #FF5722;
        }
        .node-inspector-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: 18px;
          padding: 32px 28px;
          backdrop-filter: blur(10px);
        }
        .badge-tag {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #F87171;
          background: rgba(220, 38, 38, 0.15);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .badge-live {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #4ADE80;
          background: rgba(74, 222, 128, 0.1);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .inspector-title {
          font-size: 26px;
          font-weight: 800;
          color: #FFFFFF;
        }
        .inspector-full-name {
          font-size: 14px;
        }
        .inspector-text {
          color: #94A3B8;
          line-height: 1.6;
          font-size: 14.5px;
        }
        .integrated-benefits {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 16px;
        }
        .benefit-row {
          font-size: 13.5px;
          color: #E2E8F0;
        }
        .advantage-focus-banner {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(249, 115, 22, 0.08) 100%);
          border: 1px solid rgba(220, 38, 38, 0.25);
          border-radius: 20px;
        }
      `}</style>
    </section>
  );
};

export default NexoraAdvantage;
