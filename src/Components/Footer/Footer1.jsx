import React, { useEffect, useState } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import { getAboutDetails } from "../../utils/aboutData";
import { getFooterDetails } from "../../utils/footerData";

const Footer1 = () => {
  const [logoSrc, setLogoSrc] = useState("/1global1.png");
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    loadBackgroudImages();
    getAboutDetails().then((data) => {
      if (data && data.logo_src) {
        setLogoSrc(data.logo_src);
      }
    });
    getFooterDetails().then((data) => {
      if (data) {
        setFooterData(data);
      }
    });
  }, []);

  const addressText = footerData?.address || "1 Global Enterprises Pte Ltd\n#03-01, Keppel Distripark,\n511 Kampong Bahru Road,\nSingapore 099447";
  const emailText = footerData?.email || "info@1ge.sg";
  const phone1Text = footerData?.phone_1 || "+65 69080838";
  const phone2Text = footerData?.phone_2 || "+65 69080849";
  const phone3Text = footerData?.phone_3 || "+65 98177292";
  const copyrightText = footerData?.copyright || "© 1 Global Enterprises, All Rights Reserved.";
  const linkedinUrl = footerData?.linkedin_url || "https://www.linkedin.com/company/1-global-enterprises/";

  const handleCopy = (num) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(num);
      alert(`Copied: ${num}`);
    } else {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = num;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); alert(`Copied: ${num}`); }
      finally { document.body.removeChild(ta); }
    }
  };

  return (
    <footer className="footer-section" aria-label="Website Footer">
      <div className="container">
        <div className="footer-main">
          {/* Column 1 - Logo + About */}
          <div className="footer-col">
            <img
              src={logoSrc}
              alt="1 Global Enterprises Logo"
              className="footer-logo"
            />

            <p className="footer-text">
              1 Global Enterprises Pte Ltd is a{" "}
              <span className="nowrap">Singapore&#8209;headquartered</span>{" "}
              business group with diversified interests spanning shipping,
              logistics and supply chain solutions, product distribution,
              renewable and clean energy, and global trading.
            </p>

            <div className="footer-social">
              <a
                href={linkedinUrl}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/our-business-verticals">Business Verticals</a></li>
              <li><a href="/global-presence">Global Presence</a></li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <p className="footer-text" style={{ whiteSpace: "pre-line" }}>
              {addressText}
            </p>
            <p className="footer-text">
              <a className="footer-link" href={`mailto:${emailText}`}>{emailText}</a>
            </p>
            <p className="footer-text">
              {phone1Text && (
                <>
                  <span
                    className="footer-link cursor-pointer"
                    onClick={() => handleCopy(phone1Text)}
                    title="Click to copy"
                  >
                    {phone1Text}
                  </span><br />
                </>
              )}
              {phone2Text && (
                <>
                  <span
                    className="footer-link cursor-pointer"
                    onClick={() => handleCopy(phone2Text)}
                    title="Click to copy"
                  >
                    {phone2Text}
                  </span><br />
                </>
              )}
              {phone3Text && (
                <span
                  className="footer-link cursor-pointer"
                  onClick={() => handleCopy(phone3Text)}
                  title="Click to copy"
                >
                  {phone3Text}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{copyrightText}</p>
        </div>
      </div>

      <style>{`
        .footer-section { background:#000; padding:60px 0 30px; color:#fff; }
        .container { max-width:1200px; margin:0 auto; padding:0 16px; }
        .footer-main { display:grid; grid-template-columns:1.2fr 0.8fr 1fr; gap:40px; margin-bottom:40px; }
        @media (max-width:992px){ .footer-main{ grid-template-columns:1fr 1fr; gap:32px; } }
        @media (max-width:700px){ .footer-main{ grid-template-columns:1fr; gap:24px; } }
        .footer-col{ min-width:0; }
        .footer-logo{ max-height:60px; margin-bottom:16px; }
        .footer-heading{ font-size:20px; font-weight:700; margin:12px 0; color:#fff; }
        .footer-text{ color:#fff; opacity:.9; line-height:1.7; margin-bottom:12px; overflow-wrap:break-word; hyphens:none; }
        .nowrap{ white-space:nowrap; }
        .footer-links{ list-style:none; padding:0; margin:0; }
        .footer-links li{ margin:8px 0; }
        .footer-links a, .footer-link{ color:#fff; text-decoration:none; opacity:.9; transition:opacity .25s; }
        .footer-links a:hover, .footer-link:hover{ opacity:1; }
        .footer-link.cursor-pointer:hover { text-decoration:underline; }
        .footer-social a{ display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:50%; background:#111; color:#fff; margin-right:6px; transition:opacity .25s; }
        .footer-social a:hover{ opacity:.8; }
        .footer-bottom{ border-top:1px solid rgba(255,255,255,.15); padding-top:20px; font-size:14px; opacity:.9; text-align:center; }
      `}</style>
    </footer>
  );
};

export default Footer1;
