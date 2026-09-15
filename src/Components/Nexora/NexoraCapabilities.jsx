import React, { useState } from 'react';
import { CAPABILITIES } from '../../utils/capabilityData';
import { 
  Building2, 
  Workflow, 
  Headphones, 
  TrendingUp, 
  Target, 
  BrainCircuit, 
  UserCheck, 
  Calculator, 
  Briefcase, 
  Users, 
  Database, 
  Bot, 
  Wrench,
  ArrowRight,
  X,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const CAP_ICONS = {
  "01": Building2,
  "02": Workflow,
  "03": Headphones,
  "04": TrendingUp,
  "05": Target,
  "06": BrainCircuit,
  "07": UserCheck,
  "08": Calculator,
  "09": Briefcase,
  "10": Users,
  "11": Database,
  "12": Bot,
  "13": Wrench,
};

const NexoraCapabilities = () => {
  const [activeModalCap, setActiveModalCap] = useState(null);

  const openModal = (cap) => {
    setActiveModalCap(cap);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModalCap(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="capabilities-nexora-section py-5 position-relative" id="capabilities">
      <div className="container py-lg-5">
        
        {/* Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-9">
            <span className="nexora-section-badge">CAPABILITY DIRECTORY</span>
            <h2 className="nexora-section-title mt-2">
              Thirteen capabilities. <span className="text-gradient-nexora">One integrated ecosystem.</span>
            </h2>
            <p className="nexora-lead-text mx-auto mt-3">
              Each capability can run standalone or as part of a fully integrated operation. Tap a card for what's inside.
            </p>
          </div>
        </div>

        {/* 13 Capabilities Grid */}
        <div className="row g-4 justify-content-center">
          {CAPABILITIES.map((cap) => {
            const Icon = CAP_ICONS[cap.id] || Building2;
            return (
              <div key={cap.id} className="col-xl-4 col-lg-6 col-md-6" id={`cap-${cap.id}`}>
                <div 
                  className="capability-card h-100"
                  onClick={() => openModal(cap)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(cap)}
                >
                  <div className="card-top d-flex align-items-center justify-content-between mb-3">
                    <span className="cap-number text-gradient-nexora">{cap.id}</span>
                    <div className="cap-icon-wrap">
                      <Icon size={22} className="cap-icon" />
                    </div>
                  </div>

                  <h3 className="cap-title">{cap.title}</h3>
                  <p className="cap-tagline">{cap.tagline}</p>

                  <div className="cap-action mt-auto pt-3 d-flex align-items-center justify-content-between">
                    <span className="view-details-btn">
                      View details
                    </span>
                    <ArrowRight size={16} className="cap-arrow text-danger" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Details Modal ✕ */}
      {activeModalCap && (
        <div className="modal-backdrop-custom" onClick={closeModal}>
          <div 
            className="modal-card-custom" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button ✕ */}
            <button 
              className="modal-close-btn" 
              onClick={closeModal}
              aria-label="Close details modal"
            >
              <X size={20} />
            </button>

            <div className="modal-header-section mb-4">
              <div className="d-flex align-items-center gap-3 mb-2">
                <span className="modal-number-badge">{activeModalCap.id}</span>
                <span className="modal-sub-badge">INTEGRATED CAPABILITY</span>
              </div>
              <h2 className="modal-cap-title">{activeModalCap.title}</h2>
              <p className="modal-cap-tagline">{activeModalCap.tagline}</p>
            </div>

            <div className="modal-body-section">
              <div className="modal-overview mb-4">
                <h4 className="modal-section-h">Overview &amp; Purpose</h4>
                <p className="modal-overview-text">{activeModalCap.summary}</p>
              </div>

              <div className="modal-scope mb-4">
                <h4 className="modal-section-h">Scope of Operation &amp; Deliverables</h4>
                <ul className="modal-scope-list">
                  {activeModalCap.scope.map((item, i) => (
                    <li key={i} className="modal-scope-item">
                      <CheckCircle size={17} className="text-danger flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-outcomes-box p-3 mb-4">
                <h5 className="mb-1 text-danger fw-bold fs-6">Target Business Outcome:</h5>
                <p className="mb-0 text-slate-700" style={{ fontSize: '14.5px', lineHeight: '1.6' }}>
                  {activeModalCap.outcomes}
                </p>
              </div>

              <div className="modal-footer-actions d-flex flex-wrap gap-3 align-items-center justify-content-between pt-3 border-top">
                <a 
                  href={`#contact?capability=${encodeURIComponent(activeModalCap.title)}`}
                  className="btn-nexora-primary"
                  onClick={() => {
                    closeModal();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Request this capability</span>
                  <ArrowRight size={17} />
                </a>
                <button className="btn btn-outline-secondary rounded-pill px-4" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .capabilities-nexora-section {
          background: #FFFFFF;
          color: #0F172A;
          overflow: hidden;
        }
        .capability-card {
          background: #FAFAFA;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 28px 24px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .capability-card:hover {
          background: #FFFFFF;
          border-color: #FCA5A5;
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(220, 38, 38, 0.1);
        }
        .cap-number {
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
        }
        .cap-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(249, 115, 22, 0.12) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(220, 38, 38, 0.2);
          transition: all 0.3s ease;
        }
        .capability-card:hover .cap-icon-wrap {
          background: linear-gradient(135deg, #DC2626 0%, #F97316 100%);
        }
        .cap-icon {
          color: #DC2626;
          transition: color 0.3s ease;
        }
        .capability-card:hover .cap-icon {
          color: #FFFFFF;
        }
        .cap-title {
          font-size: 19px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .cap-tagline {
          color: #64748B;
          font-size: 14.5px;
          line-height: 1.6;
          margin-bottom: 16px;
          flex-grow: 1;
        }
        .cap-action {
          border-top: 1px solid #F1F5F9;
        }
        .view-details-btn {
          font-size: 14px;
          font-weight: 700;
          color: #DC2626;
          transition: all 0.25s ease;
        }
        .capability-card:hover .view-details-btn {
          color: #FF5722;
        }
        .cap-arrow {
          transition: transform 0.25s ease;
        }
        .capability-card:hover .cap-arrow {
          transform: translateX(4px);
        }

        /* Modal ✕ Styles */
        .modal-backdrop-custom {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-card-custom {
          background: #FFFFFF;
          border-radius: 20px;
          max-width: 680px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 36px;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid #FCA5A5;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #F1F5F9;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .modal-close-btn:hover {
          background: #FEE2E2;
          color: #DC2626;
          transform: rotate(90deg);
        }
        .modal-number-badge {
          font-size: 22px;
          font-weight: 900;
          color: #DC2626;
        }
        .modal-sub-badge {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          color: #EA580C;
          background: #FFF7ED;
          border: 1px solid #FED7AA;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .modal-cap-title {
          font-size: 24px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
        }
        .modal-cap-tagline {
          font-size: 16px;
          font-weight: 600;
          color: #FF5722;
          margin-bottom: 0;
        }
        .modal-section-h {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #64748B;
          margin-bottom: 10px;
        }
        .modal-overview-text {
          font-size: 15px;
          color: #334155;
          line-height: 1.65;
        }
        .modal-scope-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .modal-scope-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14.5px;
          color: #334155;
          margin-bottom: 10px;
          line-height: 1.5;
        }
        .modal-outcomes-box {
          background: #FEF2F2;
          border-left: 4px solid #DC2626;
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
};

export default NexoraCapabilities;
