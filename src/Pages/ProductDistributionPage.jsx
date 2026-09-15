import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const ProductDistributionPage = () => {
  const title = "Sales Operations & Channel Distribution BPO";
  const imageSrc = "/aboutbg.png";
  const contentText = "Nexora360 Global Solutions empowers commercial manufacturers, distributors, and multi-channel retailers with end-to-end sales operations, distributor partner support, and order-to-cash processing.\n\nFrom catalog indexing and pricing updates to wholesale buyer support and warranty ticket handling, our capability pods handle the intricate operational details so you can focus on core revenue growth.\n\nWe provide seamless ERP connectivity, EDI order processing, CRM synchronization, and multi-tier channel accountability.";

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
              <span className="badge-tag-red mb-2 d-inline-block">SALES &amp; CHANNEL OPERATIONS</span>
              <h2 className="display-6 fw-bold mb-3 text-slate-900">
                Commercial Distribution &amp; <span className="text-gradient-nexora">Sales Support</span>
              </h2>
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-slate-600 mb-3" style={{ fontSize: '15.5px', lineHeight: '1.7' }}>
                  {p}
                </p>
              ))}
              <div className="mt-4">
                <Link to="/contact" className="btn-nexora-primary">
                  <span>Explore engagement options</span>
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

export default ProductDistributionPage;
