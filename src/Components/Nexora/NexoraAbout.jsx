import React from 'react';
import { Cpu, Users, GitMerge, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const PILLARS = [
  {
    icon: Cpu,
    title: "Technology",
    tagline: "Digital, AI & Automation",
    description: "Digital technologies, automation and AI-enabled solutions that deliver measurable business outcomes, not just reduced cost."
  },
  {
    icon: Users,
    title: "People",
    tagline: "Specialized Global Talent",
    description: "Experienced professionals who continuously look for opportunities to improve process, productivity and customer experience."
  },
  {
    icon: GitMerge,
    title: "Process",
    tagline: "Structured & Repeatable",
    description: "Structured, repeatable ways of working — built around your requirements rather than a standard outsourcing template."
  }
];

const VERTICALS = [
  "Global Capability Centres",
  "BPO",
  "Digital Marketing",
  "Digital Sales",
  "Customer Experience",
  "Contact Centre Operations",
  "KPO",
  "HR & Recruitment",
  "Finance & Accounting",
  "Administration",
  "Data Management",
  "AI & Business Process Automation"
];

const NexoraAbout = () => {
  return (
    <section className="about-nexora-section py-5 position-relative" id="about">
      <div className="container py-lg-5">
        
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-9">
            <span className="nexora-section-badge">ABOUT NEXORA360</span>
            <h2 className="nexora-section-title mt-2">
              Businesses shouldn't need <span className="text-gradient-nexora">multiple partners</span> for multiple functions.
            </h2>
            <p className="nexora-lead-text mx-auto mt-3">
              From supporting a single business function to managing complete outsourced operations, we design solutions around the unique requirements of every client. Our teams operate as an extension of your organization — dedicated resources, shared services, project-based teams, or complete outsourced functions. Whether you're a startup building your first support team, an SME scaling efficiently, or a global enterprise establishing a GCC, Nexora360 provides the flexibility and capability to support your journey.
            </p>
          </div>
        </div>

        {/* 3 Pillars: Technology, People, Process */}
        <div className="row g-4 mb-5">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="pillar-card">
                  <div className="pillar-icon-box">
                    <Icon size={30} className="pillar-icon" />
                  </div>
                  <div className="pillar-tagline">{pillar.tagline}</div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.description}</p>
                  <div className="pillar-accent-bar"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrated Capability Verticals Strip */}
        <div className="verticals-overview-card p-4 p-lg-5 mb-5">
          <div className="row align-items-center">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <span className="sub-badge-red mb-2 d-inline-block">UNIFIED PLATFORM</span>
              <h3 className="verticals-card-title">Everything under one integrated ecosystem</h3>
              <p className="verticals-card-sub">
                Connect your operational functions into a cohesive, high-performing engine.
              </p>
              <Link to="/capabilities" className="btn-nexora-primary btn-sm py-2 px-3 mt-2">
                <span>Browse all 13 capabilities</span>
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="col-lg-8">
              <div className="d-flex flex-wrap gap-2">
                {VERTICALS.map((item, idx) => (
                  <div key={idx} className="vertical-pill">
                    <CheckCircle2 size={15} className="text-danger flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Industry-Agnostic. Globally Focused. Sub-section */}
        <div className="global-focus-box p-4 p-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="globe-icon-wrap">
                  <Globe size={26} className="text-warning" />
                </div>
                <div>
                  <span className="text-uppercase fw-bold text-danger font-monospace" style={{ fontSize: '12px', letterSpacing: '1.2px' }}>
                    OPERATIONAL PHILOSOPHY
                  </span>
                  <h3 className="mb-0 text-white fw-bold fs-4">Industry-Agnostic. Globally Focused.</h3>
                </div>
              </div>
              <h4 className="text-white-50 fs-5 mb-3">
                Built to support businesses across industries and geographies.
              </h4>
              <p className="text-slate-300 mb-0" style={{ color: '#CBD5E1', lineHeight: '1.7' }}>
                Our flexible operating model allows us to understand the unique requirements of each organization and build customized solutions — rather than forcing clients into a standard outsourcing model. We work with businesses that need reliable support to operate, scale, transform and grow.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="stats-highlight-card">
                <div className="stat-number text-gradient-nexora">360°</div>
                <div className="stat-label text-white">Full Spectrum Capability</div>
                <p className="stat-sub text-muted mb-0">From single task to full turnkey GCC</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .about-nexora-section {
          background: #FFFFFF;
          color: #0F172A;
          overflow: hidden;
        }
        .nexora-section-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #DC2626;
          background: rgba(220, 38, 38, 0.08);
          border: 1px solid rgba(220, 38, 38, 0.2);
          padding: 6px 16px;
          border-radius: 9999px;
          text-transform: uppercase;
        }
        .nexora-section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #0F172A;
          line-height: 1.25;
        }
        .nexora-lead-text {
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          line-height: 1.75;
          color: #475569;
          max-width: 900px;
        }
        .pillar-card {
          background: #FAFAFA;
          border: 1px solid #F1F5F9;
          border-radius: 16px;
          padding: 36px 30px;
          height: 100%;
          position: relative;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
        }
        .pillar-card:hover {
          transform: translateY(-6px);
          background: #FFFFFF;
          border-color: #FECACA;
          box-shadow: 0 16px 36px rgba(220, 38, 38, 0.08);
        }
        .pillar-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(249, 115, 22, 0.15) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }
        .pillar-icon {
          color: #DC2626;
        }
        .pillar-tagline {
          font-size: 12px;
          font-weight: 700;
          color: #F97316;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        .pillar-title {
          font-size: 24px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 12px;
        }
        .pillar-desc {
          color: #64748B;
          line-height: 1.65;
          font-size: 15px;
          margin-bottom: 0;
          flex-grow: 1;
        }
        .pillar-accent-bar {
          height: 3px;
          width: 0;
          background: linear-gradient(90deg, #DC2626, #F97316);
          margin-top: 24px;
          border-radius: 2px;
          transition: width 0.35s ease;
        }
        .pillar-card:hover .pillar-accent-bar {
          width: 48px;
        }
        .verticals-overview-card {
          background: linear-gradient(135deg, #FFF7ED 0%, #FEF2F2 100%);
          border: 1px solid #FED7AA;
          border-radius: 20px;
        }
        .sub-badge-red {
          font-size: 11px;
          font-weight: 800;
          color: #EA580C;
          background: rgba(234, 88, 12, 0.1);
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 1px;
        }
        .verticals-card-title {
          font-size: 22px;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.3;
        }
        .verticals-card-sub {
          color: #64748B;
          font-size: 14.5px;
          line-height: 1.5;
        }
        .vertical-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid #FDBA74;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          color: #1E293B;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }
        .vertical-pill:hover {
          border-color: #DC2626;
          background: #FFF1F2;
          color: #DC2626;
          transform: translateY(-1px);
        }
        .global-focus-box {
          background: #0F172A;
          border-radius: 20px;
          border: 1px solid rgba(220, 38, 38, 0.2);
          position: relative;
          overflow: hidden;
        }
        .globe-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(249, 115, 22, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(249, 115, 22, 0.3);
        }
        .stats-highlight-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(249, 115, 22, 0.3);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          backdrop-filter: blur(6px);
        }
        .stat-number {
          font-size: 48px;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-weight: 700;
          font-size: 15px;
        }
        .stat-sub {
          font-size: 13px;
        }
      `}</style>
    </section>
  );
};

export default NexoraAbout;
