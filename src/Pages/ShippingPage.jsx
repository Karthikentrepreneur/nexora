import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const ShippingPage = () => {
  const title = "Global Logistics & Operations Support";
  const imageSrc = "/aboutbg.png";
  const contentText = "Nexora360 Global Solutions provides comprehensive outsourced back-office and customer support operations for global logistics, shipping, freight forwarding, and trade enterprises.\n\nOur specialized teams handle customs documentation, bill of lading generation, tracking and tracing, exception management, and carrier reconciliation with 99.8% precision.\n\nWhether you operate regional freight networks or global container supply chains, our dedicated operational pods extend your processing bandwidth without inflating overhead.";

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
              <span className="badge-tag-red mb-2 d-inline-block">OPERATIONS &amp; TRADE BPO</span>
              <h2 className="display-6 fw-bold mb-3 text-slate-900">
                Logistics &amp; Trade <span className="text-gradient-nexora">Process Outsourcing</span>
              </h2>
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-slate-600 mb-3" style={{ fontSize: '15.5px', lineHeight: '1.7' }}>
                  {p}
                </p>
              ))}
              <div className="mt-4">
                <Link to="/contact" className="btn-nexora-primary">
                  <span>Inquire for your operations</span>
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

export default ShippingPage;
