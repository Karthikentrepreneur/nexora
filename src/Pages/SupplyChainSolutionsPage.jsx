import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const SupplyChainSolutionsPage = () => {
  const title = "Business & Capability Solutions";
  const imageSrc = "/aboutbg.png";
  const contentText = "Nexora360 Global Solutions builds and operates high-performing capability teams that power modern business operations. Our integrated ecosystem brings GCC, BPO, KPO, digital marketing, sales, customer experience, IT, HR, finance and AI & automation together under one unified operating model.\n\nFrom supporting a single business function to managing complete outsourced operations, we design solutions around the unique requirements of every client. Our teams operate as an extension of your organization — dedicated resources, shared services, project-based teams, or complete outsourced functions.";

  const paragraphs = contentText.split(/\n+/).map(p => p.trim()).filter(Boolean);

  return (
    <div className="nexora-vertical-page">
      <BreadCumb bgimg="/aboutbg.png" Title={title} />
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-6">
              <img
                src={imageSrc}
                alt={title}
                className="img-fluid rounded-4 shadow-sm border border-danger border-opacity-25"
              />
            </div>
            <div className="col-lg-6">
              <span className="badge-tag-red mb-2 d-inline-block">NEXORA360 CAPABILITY PODS</span>
              <h2 className="display-6 fw-bold mb-3 text-slate-900">
                End-to-End <span className="text-gradient-nexora">Capability Engineering</span>
              </h2>
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-slate-600 mb-3" style={{ fontSize: '15.5px', lineHeight: '1.7' }}>
                  {p}
                </p>
              ))}
              <div className="mt-4">
                <Link to="/capabilities" className="btn-nexora-primary">
                  <span>Explore all 13 capabilities</span>
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

export default SupplyChainSolutionsPage;
