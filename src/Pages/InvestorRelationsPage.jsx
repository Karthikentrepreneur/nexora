import React from "react";
import BreadCumb from "../Components/Common/BreadCumb";
import useSEO from "../hooks/useSEO";
import { Link } from "react-router";
import { ShieldCheck, TrendingUp, Layers, CheckCircle2, ArrowRight } from "lucide-react";

const InvestorRelationsPage = () => {
  useSEO('investors');
  return (
    <div className="nexora-investors-page">
      <BreadCumb bgimg="/aboutbg.png" Title="Investor Relations" />

      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          {/* Intro */}
          <div className="row align-items-center g-4 mb-5">
            <div className="col-lg-6">
              <span className="badge-tag-red mb-2 d-inline-block">GOVERNANCE &amp; PERFORMANCE</span>
              <h2 className="display-6 fw-bold mb-3 text-slate-900">
                Nexora360 Global Solutions — <span className="text-gradient-nexora">Investor Relations</span>
              </h2>
              <p className="lead text-slate-600 mb-4" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                Nexora360 Global Solutions Private Limited is a next-generation global business services and capability partner bringing GCC, BPO, KPO, digital, customer experience, IT, HR, finance and AI &amp; automation together under one integrated ecosystem. Our Investor Relations portal provides full transparency into our strategic roadmap, operating governance, and value creation metrics.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/contact" className="btn-nexora-primary">
                  <span>Contact Investor Relations</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/the-advantage" className="btn-nexora-secondary text-dark border-secondary">
                  <span>The 360° Advantage</span>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-4 rounded-4 bg-dark text-white border border-danger border-opacity-25 shadow-lg position-relative overflow-hidden">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="p-2 rounded-3 bg-danger bg-opacity-25 text-danger">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="text-white mb-0 fw-bold">Ecosystem Economics</h4>
                    <span className="text-warning small font-monospace">CONSOLIDATED VALUE METRICS</span>
                  </div>
                </div>
                <p className="text-slate-300 small mb-3">
                  By consolidating 13 distinct capability lines under a shared operational infrastructure and unified management, Nexora360 generates compounding operating leverage, high client retention, and attractive unit margins.
                </p>
                <div className="border-top border-secondary pt-3">
                  <div className="row g-2 text-center">
                    <div className="col-4">
                      <div className="fs-3 fw-bold text-danger">13</div>
                      <span className="small text-muted">Capabilities</span>
                    </div>
                    <div className="col-4">
                      <div className="fs-3 fw-bold text-warning">360°</div>
                      <span className="small text-muted">Integration</span>
                    </div>
                    <div className="col-4">
                      <div className="fs-3 fw-bold text-success">100%</div>
                      <span className="small text-muted">Accountability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Highlights */}
          <div className="row g-4 mb-5">
            <div className="col-12">
              <h3 className="fw-bold mb-2">Key Investment Pillars</h3>
              <p className="text-muted">Structured around our core commitments and integrated operating model.</p>
            </div>
            
            <div className="col-md-4">
              <div className="p-4 border border-danger border-opacity-25 rounded-4 h-100 bg-light shadow-sm">
                <div className="mb-3 text-danger"><Layers size={28} /></div>
                <h5 className="fw-bold mb-2">Integrated Capability Model</h5>
                <p className="text-muted mb-0" style={{ fontSize: '14.5px', lineHeight: '1.6' }}>
                  Cross-selling and bundling multi-department capability (GCC, BPO, KPO, AI) leads to longer customer lifetimes and higher Net Revenue Retention (NRR).
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 border border-danger border-opacity-25 rounded-4 h-100 bg-light shadow-sm">
                <div className="mb-3 text-danger"><TrendingUp size={28} /></div>
                <h5 className="fw-bold mb-2">AI &amp; Automation Native</h5>
                <p className="text-muted mb-0" style={{ fontSize: '14.5px', lineHeight: '1.6' }}>
                  Embedded automation, robotic process automation, and intelligent document workflows allow our capability pods to scale output with superior operational efficiency.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 border border-danger border-opacity-25 rounded-4 h-100 bg-light shadow-sm">
                <div className="mb-3 text-danger"><ShieldCheck size={28} /></div>
                <h5 className="fw-bold mb-2">Enterprise Governance</h5>
                <p className="text-muted mb-0" style={{ fontSize: '14.5px', lineHeight: '1.6' }}>
                  Rigorous adherence to international compliance, data privacy, SLA transparency, and client-first operating integrity across all global delivery pods.
                </p>
              </div>
            </div>
          </div>

          {/* Corporate Commitment Statement */}
          <div className="p-4 p-lg-5 rounded-4 bg-dark text-white border border-danger border-opacity-30">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h4 className="fw-bold text-white mb-2">Our Corporate Standard</h4>
                <p className="text-slate-300 mb-0">
                  THINK NEXT. EXECUTE BETTER. OPTIMIZE EVERYTHING. DELIVER EXCELLENCE.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                <Link to="/contact" className="btn-nexora-primary">
                  <span>Connect with us</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .badge-tag-red {
          font-size: 11px;
          font-weight: 800;
          color: #DC2626;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.2);
          padding: 4px 12px;
          border-radius: 9999px;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
};

export default InvestorRelationsPage;
