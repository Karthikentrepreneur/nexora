import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getFooterDetails } from "../../utils/footerData";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

const Footer1 = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    getFooterDetails().then((data) => {
      if (data) {
        setFooterData(data);
      }
    });
  }, []);

  const addressText = footerData?.address || "ED-305, Bollineni Hillside Phase 2,\nPerumbakkam, Chennai 600126";
  const emailText = footerData?.email || "info@nexora360global.com";
  const phoneText = footerData?.phone_1 || "+91 96556 80234";
  const copyrightText = footerData?.copyright || "© 2026 Nexora360 Global Solutions Private Limited";

  return (
    <footer className="footer-section" aria-label="Website Footer">
      <div className="container">
        {/* Top CTA Banner Strip */}
        <div className="footer-cta-strip">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="footer-cta-badge">360° ECOSYSTEM INTEGRATION</span>
              <h3 className="footer-cta-title">Ready to transform and streamline your business capabilities?</h3>
              <p className="footer-cta-desc">
                From a single outsourced process to an enterprise-grade Global Capability Centre — we build the team and workflow around your goals.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/contact" className="btn-nexora-primary">
                <span>Start a conversation</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="footer-main">
          {/* Column 1 - Brand & Positioning */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-link">
              <img
                src="/nexora360-logo-white.svg"
                alt="Nexora360 Global Solutions"
                className="footer-logo"
              />
            </Link>
            <p className="footer-tagline">One partner. Every business need.</p>
            <p className="footer-text">
              A next-generation global business services and capability partner — bringing GCC, BPO, KPO, digital, customer experience, IT, HR, finance and AI & automation together under one integrated ecosystem.
            </p>
            <div className="footer-motto-badge">
              THINK NEXT. EXECUTE BETTER. OPTIMIZE EVERYTHING. DELIVER EXCELLENCE.
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/"><ArrowRight size={14} className="link-icon" /> Home</Link></li>
              <li><Link to="/about"><ArrowRight size={14} className="link-icon" /> About Nexora360</Link></li>
              <li><Link to="/values"><ArrowRight size={14} className="link-icon" /> Our Values (NEXORA)</Link></li>
              <li><Link to="/capabilities"><ArrowRight size={14} className="link-icon" /> Capability Directory</Link></li>
              <li><Link to="/the-advantage"><ArrowRight size={14} className="link-icon" /> The 360° Advantage</Link></li>
              <li><Link to="/contact"><ArrowRight size={14} className="link-icon" /> Contact & Inquiries</Link></li>
            </ul>
          </div>

          {/* Column 3 - 360 Ecosystem Highlights */}
          <div className="footer-col">
            <h4 className="footer-heading">Ecosystem Verticals</h4>
            <ul className="footer-links">
              <li><Link to="/capabilities"><ArrowRight size={14} className="link-icon" /> Global Capability Centres (GCC)</Link></li>
              <li><Link to="/capabilities"><ArrowRight size={14} className="link-icon" /> Business Process Outsourcing (BPO)</Link></li>
              <li><Link to="/capabilities"><ArrowRight size={14} className="link-icon" /> Customer Experience & Contact Centre</Link></li>
              <li><Link to="/capabilities"><ArrowRight size={14} className="link-icon" /> AI & Automation Services</Link></li>
              <li><Link to="/capabilities"><ArrowRight size={14} className="link-icon" /> Knowledge Process Outsourcing (KPO)</Link></li>
              <li><Link to="/capabilities"><ArrowRight size={14} className="link-icon" /> HR & Recruitment Solutions</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Get in Touch</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <p className="footer-text mb-0" style={{ whiteSpace: "pre-line" }}>
                {addressText}
              </p>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <a className="footer-link" href={`mailto:${emailText}`}>
                {emailText}
              </a>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <a className="footer-link" href={`tel:${phoneText.replace(/\s+/g, '')}`}>
                {phoneText}
              </a>
            </div>
            <div className="footer-trust-badge mt-3">
              <ShieldCheck size={16} className="text-danger me-2" />
              <span>Industry-Agnostic. Globally Focused.</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
              <p className="mb-0 copyright-text">{copyrightText}</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="footer-accent-text">
                Red &amp; Orange Powered Enterprise Capability
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: #0B0F17;
          padding: 70px 0 30px;
          color: #fff;
          position: relative;
          border-top: 2px solid #DC2626;
        }
        .footer-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #DC2626 0%, #FF5722 50%, #F97316 100%);
        }
        .footer-cta-strip {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: 16px;
          padding: 36px 40px;
          margin-bottom: 50px;
          backdrop-filter: blur(8px);
        }
        .footer-cta-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #FF5722;
          background: rgba(255, 87, 34, 0.15);
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .footer-cta-title {
          color: #fff;
          font-weight: 800;
          font-size: clamp(20px, 2.5vw, 26px);
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .footer-cta-desc {
          color: #94A3B8;
          font-size: 15px;
          margin-bottom: 0;
        }
        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr 1.3fr;
          gap: 36px;
          margin-bottom: 44px;
        }
        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 640px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .footer-cta-strip {
            padding: 24px 20px;
          }
        }
        .footer-logo {
          height: 48px;
          width: auto;
          margin-bottom: 12px;
        }
        .footer-tagline {
          font-size: 16px;
          font-weight: 700;
          color: #FF5722;
          margin-bottom: 10px;
        }
        .footer-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 18px;
          color: #fff;
          position: relative;
          display: inline-block;
        }
        .footer-heading::after {
          content: "";
          display: block;
          width: 28px;
          height: 3px;
          background: linear-gradient(90deg, #DC2626, #F97316);
          border-radius: 2px;
          margin-top: 6px;
        }
        .footer-text {
          color: #94A3B8;
          line-height: 1.65;
          font-size: 14.5px;
        }
        .footer-motto-badge {
          display: inline-block;
          margin-top: 16px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          color: #F97316;
          background: rgba(249, 115, 22, 0.1);
          border: 1px dashed rgba(249, 115, 22, 0.4);
          padding: 8px 12px;
          border-radius: 8px;
          line-height: 1.4;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-links li {
          margin-bottom: 10px;
        }
        .footer-links a {
          color: #CBD5E1;
          text-decoration: none;
          font-size: 14.5px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s ease;
        }
        .footer-links a:hover {
          color: #FF5722;
          transform: translateX(4px);
        }
        .link-icon {
          color: #FF5722;
          opacity: 0.7;
          transition: transform 0.25s ease;
        }
        .footer-links a:hover .link-icon {
          opacity: 1;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
        }
        .contact-icon {
          color: #FF5722;
          flex-shrink: 0;
          margin-top: 3px;
        }
        .footer-link {
          color: #CBD5E1;
          text-decoration: none;
          font-size: 14.5px;
          transition: color 0.25s ease;
        }
        .footer-link:hover {
          color: #FF5722;
          text-decoration: underline;
        }
        .footer-trust-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(220, 38, 38, 0.12);
          border: 1px solid rgba(220, 38, 38, 0.25);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: #F87171;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 24px;
          margin-top: 20px;
        }
        .copyright-text {
          color: #94A3B8;
          font-size: 13.5px;
        }
        .footer-accent-text {
          font-size: 13px;
          color: #F97316;
          font-weight: 600;
        }
      `}</style>
    </footer>
  );
};

export default Footer1;
