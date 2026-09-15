import { useEffect, useState } from 'react';
import { Link } from "react-router";
import Nav from './Nav';

export default function Header3({ variant }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState('');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // In initial header (before scroll), ALWAYS show whitebg.png
  // When scrolled down (white sticky background), show blackbg.png
  const isInitial = !hasScrolled;
  const logoSrc = isInitial ? '/whitebg.png' : '/blackbg.png';
  const textColor = isInitial ? '#ffffff' : '#0F172A';
  const bgColor = hasScrolled ? '#ffffff' : 'transparent';

  const headerStyle = {
    color: textColor,
    backgroundColor: bgColor,
    transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos && currentScrollPos > 120) {
        setIsSticky('cs-gescout_sticky');
      } else if (currentScrollPos !== 0) {
        setIsSticky('cs-gescout_show cs-gescout_sticky');
      } else {
        setIsSticky('');
      }

      setPrevScrollPos(currentScrollPos);
      setHasScrolled(currentScrollPos > 60);
    };

    setHasScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div>
      <style>{`
        .cs_site_branding img {
          height: clamp(50px, 5.5vw, 68px);
          width: auto;
          max-width: 220px;
          display: block;
          object-fit: contain;
          transition: height 0.3s ease, transform 0.3s ease;
        }
        .cs_site_branding:hover img {
          transform: scale(1.02);
        }
        .cs_sticky_header .cs_site_branding img,
        .cs-gescout_sticky .cs_site_branding img {
          height: clamp(44px, 4.8vw, 58px);
        }
        .cs_main_header_left .cs_site_branding {
          display: inline-flex;
          align-items: center;
          line-height: 0;
          padding: 4px 0;
        }
        header.cs_site_header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 101;
          transition: background-color 0.35s ease, box-shadow 0.35s ease;
        }
        header.cs_site_header.scrolled {
          position: fixed;
          background-color: #ffffff !important;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
          border-bottom: 1px solid rgba(220, 38, 38, 0.1);
        }
        header.cs_site_header:not(.scrolled) .cs-munu_toggle span,
        header.cs_site_header:not(.scrolled) .cs-munu_toggle span:before,
        header.cs_site_header:not(.scrolled) .cs-munu_toggle span:after {
          background-color: #ffffff !important;
        }
        header.cs_site_header.scrolled .cs-munu_toggle span,
        header.cs_site_header.scrolled .cs-munu_toggle span:before,
        header.cs_site_header.scrolled .cs-munu_toggle span:after {
          background-color: #0F172A !important;
        }
        .header-btn .theme-btn {
          background: linear-gradient(135deg, #DC2626 0%, #FF5722 50%, #F97316 100%) !important;
          color: #fff !important;
          padding: 12px 26px !important;
          min-width: auto !important;
          font-size: 14.5px !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3) !important;
          border-radius: 9999px !important;
          transition: all 0.3s ease !important;
        }
        .header-btn .theme-btn:hover {
          background: linear-gradient(135deg, #B91C1C 0%, #EA580C 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.45) !important;
        }
        @media (max-width: 991px) {
          .cs_nav .cs_nav_list {
            background: #ffffff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            border-radius: 12px;
            padding: 16px 20px;
          }
          .cs_nav .cs_nav_list li a {
            color: #0F172A !important;
            padding: 10px 0;
            display: block;
            font-weight: 600;
          }
          .cs_nav .cs_nav_list li a:hover,
          .cs_nav .cs_nav_list li a.active-nav-link {
            color: #DC2626 !important;
          }
        }
      `}</style>

      <header
        style={headerStyle}
        className={`cs_site_header header_style_2 header_style_2_2 cs_style_1 header_sticky_style1 
          ${variant || ''} 
          cs_sticky_header cs_site_header_full_width 
          ${mobileToggle ? 'cs_mobile_toggle_active' : ''} 
          ${isSticky || ''} 
          ${hasScrolled ? 'scrolled' : ''}`}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              
              {/* Left: Nexora360 Logo (whitebg.png in initial header, blackbg.png on scroll) */}
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" to="/" aria-label="Nexora360 Home">
                  <img src={logoSrc} alt="Nexora360 Global Solutions" />
                </Link>
              </div>

              {/* Center: Navigation Links */}
              <div className="cs_main_header_center">
                <div className="cs_nav cs_primary_font fw-medium">
                  <span
                    className={mobileToggle ? 'cs-munu_toggle cs_teggle_active' : 'cs-munu_toggle'}
                    onClick={() => setMobileToggle(!mobileToggle)}
                    aria-label="Toggle Navigation Menu"
                  >
                    <span></span>
                  </span>
                  <Nav setMobileToggle={setMobileToggle} linkColor={textColor} />
                </div>
              </div>

              {/* Right: Get In Touch CTA Button */}
              <div className="cs_main_header_right">
                <div className="header-btn d-flex align-items-center">
                  <div className="main-button">
                    <Link 
                      to="/contact" 
                      className="theme-btn" 
                      style={{ color: "#fff" }}
                    >
                      <span>
                        Get in touch <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
