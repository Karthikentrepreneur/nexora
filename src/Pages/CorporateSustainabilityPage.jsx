import React, { useEffect, useState } from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { getNavbarVerticals } from '../utils/navbarVerticalData';
import { Link } from 'react-router';
import { ArrowRight, Leaf, ShieldCheck, HeartHandshake } from 'lucide-react';

const CorporateSustainabilityPage = () => {
  const [verticalData, setVerticalData] = useState(null);

  useEffect(() => {
    getNavbarVerticals().then((data) => {
      if (data) {
        const matched = data.find((item) => item.url_path === '/corporate-sustainability');
        if (matched) {
          setVerticalData(matched);
        }
      }
    });
  }, []);

  const title = verticalData?.title || "Corporate Sustainability";
  const imageSrc = verticalData?.image_src || "/aboutbg.png";
  const contentText = verticalData?.content || "At Nexora360 Global Solutions, sustainable capability management is central to our long-term partnership commitments. By digitizing workflows, integrating AI automation, and empowering remote capability centres, we optimize resource consumption and reduce carbon overhead.\n\nOur initiatives include paperless back-office automation, energy-conscious cloud infrastructure, ethical global recruitment, and continuous employee development. Together, these standards minimize environmental impact while creating durable value for our partners worldwide.\n\nWe believe high-performing enterprises and responsible governance go hand in hand. Our commitments ensure measurable outcomes, diversity, equal opportunity, and transparency across every engagement.";

  const paragraphs = contentText.split(/\n+/).map(p => p.trim()).filter(Boolean);
  const section1Paragraphs = paragraphs.slice(0, 2);
  const section2Paragraphs = paragraphs.slice(2);

  return (
    <div className="nexora-sustainability-page">
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
              <span className="badge-tag-red mb-2 d-inline-block">ESG &amp; RESPONSIBLE CAPABILITY</span>
              <h2 className="display-6 fw-bold mb-3 text-slate-900">
                Sustainable Practices in <span className="text-gradient-nexora">Global Business Services</span>
              </h2>
              {section1Paragraphs.map((p, idx) => (
                <p key={idx} className="text-slate-600" style={{ lineHeight: '1.7', fontSize: '15.5px' }}>{p}</p>
              ))}
            </div>
          </div>

          {section2Paragraphs.length > 0 && (
            <div className="row align-items-center g-5 pt-3">
              <div className="col-lg-6 order-lg-2">
                <div className="p-4 p-lg-5 rounded-4 bg-dark text-white border border-danger border-opacity-30">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <Leaf size={28} className="text-danger" />
                    <h4 className="mb-0 text-white fw-bold">People, Process &amp; Planet</h4>
                  </div>
                  {section2Paragraphs.map((p, idx) => (
                    <p key={idx} className="text-slate-300 mb-3" style={{ lineHeight: '1.7' }}>{p}</p>
                  ))}
                  <Link to="/contact" className="btn-nexora-primary mt-2">
                    <span>Partner with us</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="p-4 border rounded-3 bg-light">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <ShieldCheck className="text-danger" size={22} />
                        <h5 className="mb-0 fw-bold">Ethical Sourcing &amp; Compliance</h5>
                      </div>
                      <p className="small text-muted mb-0">100% fair labor standards, cross-border compliance, and transparent reporting.</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-4 border rounded-3 bg-light">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <HeartHandshake className="text-danger" size={22} />
                        <h5 className="mb-0 fw-bold">Continuous Talent Enablement</h5>
                      </div>
                      <p className="small text-muted mb-0">Upskilling in emerging tech, automation, and leadership development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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

export default CorporateSustainabilityPage;
