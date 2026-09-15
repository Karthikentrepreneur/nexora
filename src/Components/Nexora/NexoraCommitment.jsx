import React from 'react';
import { COMMITMENTS } from '../../utils/capabilityData';
import { ShieldCheck, Award, Lightbulb, Zap, Eye, Trophy, Compass, Flag } from 'lucide-react';

const COMMITMENT_ICONS = [
  ShieldCheck, // Reliability
  Award,       // Excellence
  Lightbulb,   // Innovation
  Zap,         // Agility
  Eye,         // Transparency
  Trophy       // Customer Success
];

const NexoraCommitment = () => {
  return (
    <section className="commitments-nexora-section py-5 position-relative" id="commitments">
      <div className="container py-lg-5">
        
        {/* Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-9">
            <span className="nexora-section-badge">OUR COMMITMENT</span>
            <h2 className="nexora-section-title mt-2">
              Long-term partnerships, <span className="text-gradient-nexora">built on six commitments.</span>
            </h2>
            <p className="nexora-lead-text mx-auto mt-3">
              Industry-agnostic and globally focused — our flexible operating model is built to understand the unique requirements of each organization, not to force clients into a standard outsourcing model.
            </p>
          </div>
        </div>

        {/* 6 Commitments Grid */}
        <div className="row g-4 mb-5">
          {COMMITMENTS.map((item, idx) => {
            const Icon = COMMITMENT_ICONS[idx] || ShieldCheck;
            return (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="commitment-card">
                  <div className="commitment-icon-wrap mb-3">
                    <Icon size={24} className="text-danger" />
                  </div>
                  <h3 className="commitment-title">{item.title}</h3>
                  <p className="commitment-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vision & Mission Cards */}
        <div className="row g-4">
          {/* Vision */}
          <div className="col-lg-6">
            <div className="vision-mission-card vision-card p-4 p-lg-5 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="vm-icon-wrap">
                  <Compass size={28} className="text-white" />
                </div>
                <div>
                  <span className="vm-tag">STRATEGIC HORIZON</span>
                  <h3 className="vm-title mb-0">Our Vision</h3>
                </div>
              </div>
              <p className="vm-body-text">
                To be the world's trusted 360° business capability partner, enabling organizations to operate smarter, scale faster and grow stronger.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="col-lg-6">
            <div className="vision-mission-card mission-card p-4 p-lg-5 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="vm-icon-wrap mission-icon-wrap">
                  <Flag size={28} className="text-white" />
                </div>
                <div>
                  <span className="vm-tag">OPERATIONAL PURPOSE</span>
                  <h3 className="vm-title mb-0">Our Mission</h3>
                </div>
              </div>
              <p className="vm-body-text">
                To deliver integrated, technology-enabled and people-driven business solutions across operations, digital, customer experience, technology, knowledge, HR and corporate support.
              </p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .commitments-nexora-section {
          background: #FAFAFA;
          color: #0F172A;
          overflow: hidden;
          border-top: 1px solid #F1F5F9;
        }
        .commitment-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 30px 24px;
          height: 100%;
          transition: all 0.3s ease;
          position: relative;
        }
        .commitment-card:hover {
          transform: translateY(-5px);
          border-color: #FCA5A5;
          box-shadow: 0 16px 36px rgba(220, 38, 38, 0.08);
        }
        .commitment-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(220, 38, 38, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }
        .commitment-title {
          font-size: 20px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 10px;
        }
        .commitment-desc {
          color: #64748B;
          font-size: 15px;
          line-height: 1.65;
          margin-bottom: 0;
        }
        .vision-mission-card {
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
          transition: transform 0.3s ease;
        }
        .vision-mission-card:hover {
          transform: translateY(-4px);
        }
        .vision-card {
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          color: #FFFFFF;
          border-color: rgba(220, 38, 38, 0.3);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15);
        }
        .mission-card {
          background: linear-gradient(135deg, #2D1515 0%, #170909 100%);
          color: #FFFFFF;
          border-color: rgba(249, 115, 22, 0.4);
          box-shadow: 0 16px 36px rgba(220, 38, 38, 0.15);
        }
        .vm-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #DC2626 0%, #FF5722 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.4);
        }
        .mission-icon-wrap {
          background: linear-gradient(135deg, #EA580C 0%, #DC2626 100%);
          box-shadow: 0 4px 14px rgba(234, 88, 12, 0.4);
        }
        .vm-tag {
          display: block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #F97316;
        }
        .vm-title {
          font-size: 26px;
          font-weight: 800;
          color: #FFFFFF;
        }
        .vm-body-text {
          color: #E2E8F0;
          font-size: 16.5px;
          line-height: 1.7;
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
};

export default NexoraCommitment;
