import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { Link } from 'react-router';
import { ArrowRight, Bot, Cpu, Code2 } from 'lucide-react';

const SoftwareDevelopmentPage = () => {
  const title = "IT, Software & AI Automation";
  const imageSrc = "/aboutbg.png";
  const contentText = "At Nexora360 Global Solutions, our technology and software engineering pods build scalable digital platforms, automated business workflows, and custom AI copilots. We bring enterprise technology together with operational execution under one unified roof.\n\nFrom modern cloud architectures and full-stack web platforms to Robotic Process Automation (RPA) and intelligent document processing, our dedicated engineers operate as an agile extension of your technical team.\n\nWe provide continuous DevOps, infrastructure monitoring, API development, and data engineering so you can launch faster and operate with complete reliability.";

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
              <span className="badge-tag-red mb-2 d-inline-block">TECH &amp; AUTOMATION</span>
              <h2 className="display-6 fw-bold mb-3 text-slate-900">
                Software &amp; <span className="text-gradient-nexora">AI-Enabled Solutions</span>
              </h2>
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-slate-600 mb-3" style={{ fontSize: '15.5px', lineHeight: '1.7' }}>
                  {p}
                </p>
              ))}
              <div className="mt-4">
                <Link to="/contact" className="btn-nexora-primary">
                  <span>Inquire about IT Pods</span>
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

export default SoftwareDevelopmentPage;
