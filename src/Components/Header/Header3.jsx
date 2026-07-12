import { useEffect, useState } from 'react';
import { Link } from "react-router";
import Nav from './Nav';
import { getAboutDetails } from '../../utils/aboutData';

export default function Header3({ variant }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState('');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [customLogo, setCustomLogo] = useState('');

  const isHero = variant === 'header-transparent' && !hasScrolled;

  // ✅ Logo + color swap on scroll
  const logoSrc = isHero ? (customLogo || '/1global1.png') : '/one-globe.png';
  const textColor = isHero ? '#fff' : '#000';
  const bgColor = hasScrolled ? '#fff' : 'transparent';

  const headerStyle = {
    color: textColor,
    backgroundColor: bgColor,
    transition: 'background-color 0.4s ease, color 0.4s ease',
  };

  useEffect(() => {
    getAboutDetails().then((data) => {
      if (data && data.logo_src) {
        setCustomLogo(data.logo_src);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const heroHeight = document.querySelector('.hero-section')?.offsetHeight || 100;

      // make header sticky & visible on scroll
      if (currentScrollPos > prevScrollPos) {
        setIsSticky('cs-gescout_sticky'); // scrolling down
      } else if (currentScrollPos !== 0) {
        setIsSticky('cs-gescout_show cs-gescout_sticky'); // scrolling up
      } else {
        setIsSticky('');
      }

      setPrevScrollPos(currentScrollPos);
      setHasScrolled(currentScrollPos > heroHeight * 0.1); // activates early
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div>
      {/* Inline CSS for logo responsiveness */}
      <style>{`
        .cs_site_branding img {
          height: clamp(40px, 5vw, 64px);
          width: auto;
          display: block;
          object-fit: contain;
          transition: height 0.3s ease;
        }
        .cs_sticky_header .cs_site_branding img,
        .cs-gescout_sticky .cs_site_branding img {
          height: clamp(34px, 4.2vw, 56px);
        }
        .cs_main_header_left .cs_site_branding {
          display: inline-flex;
          align-items: center;
          line-height: 0;
        }
        header.cs_site_header {
          transition: background-color 0.4s ease, box-shadow 0.4s ease;
        }
        header.cs_site_header.scrolled {
          background-color: #fff !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
      `}</style>

      <header
        style={headerStyle}
        className={`cs_site_header header_style_2 header_style_2_2 cs_style_1 header_sticky_style1 
          ${isHero ? variant : ''} 
          cs_sticky_header cs_site_header_full_width 
          ${mobileToggle ? 'cs_mobile_toggle_active' : ''} 
          ${isSticky || ''} 
          ${hasScrolled ? 'scrolled' : ''}`}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              
              {/* Left: Logo */}
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" to="/">
                  <img src={logoSrc} alt="Logo" />
                </Link>
              </div>

              {/* Center: Navigation */}
              <div className="cs_main_header_center">
                <div className="cs_nav cs_primary_font fw-medium">
                  <span
                    className={mobileToggle ? 'cs-munu_toggle cs_teggle_active' : 'cs-munu_toggle'}
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                  <Nav setMobileToggle={setMobileToggle} linkColor={textColor} />
                </div>
              </div>

              {/* Right: Button */}
              <div className="cs_main_header_right">
                <div className="header-btn d-flex align-items-center">
                  <div className="main-button">
                    <Link 
                      to="/global-presence" 
                      className="theme-btn" 
                      style={{ color: "#fff" }}
                    >
                      <span>
                        Global Presence <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* spacing to offset fixed header */}
      <div className="cs_site_header_spacing_140"></div>
    </div>
  );
}
