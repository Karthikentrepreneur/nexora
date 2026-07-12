// src/Components/About/About1.jsx
import React, { useEffect } from "react";
import Slider from "react-slick";
import { Users2, Globe2, BadgeCheck } from "lucide-react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import { getAboutDetails } from "../../utils/aboutData";

const About1 = () => {
  const [aboutData, setAboutData] = React.useState(null);
  const [logos, setLogos] = React.useState(() => {
    const stored = localStorage.getItem('__1ge_subsidiary_logos');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return [
      { img: "/logosss01.png", alt: "Global Gateway Logistics", link: "https://www.ggl.sg/" },
      { img: "/logosss03.png", alt: "OECL Supply Chain", link: "https://www.oecl.sg/" },
      { img: "/logosss02.png", alt: "Global Consol", link: "https://www.globalconsol.com/" },
      { img: "/Haixun_logo.png", alt: "Hai Xun Logistics", link: "https://www.haixun.co/" },
      { img: "/one.png", alt: "ONE Global Logistics", link: "https://www.onegloballogistics.co/" },
      { img: "/logosss04.png", alt: "Moltech Energy", link: "https://www.moltechglobal.com/" },
      { img: "/logosss05.png", alt: "CityGn Distribution", link: "https://www.citygnenergy.com/" },
      { img: "/logo-2.png", alt: "Future Net Logistics", link: "https://futurenetlogistics.com/" },
    ];
  });

  useEffect(() => {
    loadBackgroudImages();
    getAboutDetails().then((data) => {
      if (data) {
        setAboutData(data);
      }
    });
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2200,
    responsive: [
      { breakpoint: 1399, settings: { slidesToShow: 5 } },
      { breakpoint: 1199, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 2, centerMode: true, centerPadding: "10px" } },
      { breakpoint: 575, settings: { slidesToShow: 1, centerMode: true, centerPadding: "16px" } },
    ],
  };

  return (
    <section
      className="about-section bg-cover"
      data-background="/about-bg.png"
      style={{ padding: "80px 0 0", overflow: "hidden" }}
    >
      <style>{`
        :root {
          --accent:#26B6E0;
          --ink:#0E0F2C;
          --muted:#444;
        }

        .about-section { overflow-x: hidden; background: #fff; }
        .about-wrapper { width: 100%; }
        .about-row { display: flex; flex-wrap: wrap; }

        /* ===== Left image ===== */
        .about-image-col { padding-right: 16px; }
        .about-photo-wrap { width: 100%; display: flex; justify-content: center; align-items: center; }
        .about-photo {
          display: block; width: 100%; height: auto; object-fit: contain; object-position: center;
          border-radius: 12px; border: 2px solid #e6eef3;
          box-shadow: 0 8px 24px rgba(0,0,0,.08);
          background: #fff;
        }

        /* ===== Right column ===== */
        .about-text-col { padding-left: 16px; position: relative; z-index: 2; }
        .about-content .section-title h2 {
          margin-bottom: 16px;
          color: var(--ink);
          font-weight: 800;
          font-size: 34px;
          line-height: 1.15;
        }

        /* Remove theme pseudo-elements */
        .about-area::before,
        .about-area::after { display: none !important; content: none !important; }
        .about-area .line-image { display: none !important; }

        /* ===== Perfectly aligned icon list ===== */
        .about-area {
          --icon-size: 58px;
          --gap: 18px;
        }

        .about-items {
          display: flex;
          align-items: center;
          gap: var(--gap);
          margin-bottom: 28px;
        }

        .about-items:last-child { margin-bottom: 0; }

        .about-items .icon {
          flex-shrink: 0;
          width: var(--icon-size);
          height: var(--icon-size);
          border-radius: 50%;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(38,182,224,.35);
          transform: translateY(2px);
        }

        .about-items .icon svg {
          width: 26px;
          height: 26px;
          color: #fff;
        }

        .about-items .content {
          flex: 1;
        }

        .about-items .content h5 {
          font-weight: 800;
          margin: 0 0 6px;
          color: var(--ink);
          line-height: 1.2;
        }

        .about-items .content p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
          font-size: 15.5px;
        }

        /* ===== Group Companies ===== */
        .brand-block {
          margin-top: 60px;
          padding: 20px 0 0;
          background: transparent !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          border: none !important;
          position: relative;
        }
        .brand-block::before,
        .brand-block::after { content: none !important; }

        .brand-title {
          text-align: center;
          margin: 0 0 18px;
          font-size: 30px;
          font-weight: 800;
          color: var(--ink);
        }

        .brand-slider-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
          line-height: 0;
        }

        .brand-slider-wrap .slick-slider,
        .brand-slider-wrap .slick-list,
        .brand-slider-wrap .slick-track,
        .brand-slider-wrap .slick-slide,
        .brand-slider-wrap .slick-slide > div,
        .brand-slider-wrap .slick-dots {
          background: transparent !important;
        }

        .brand-slider-wrap .slick-list {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          overflow: visible;
        }

        .brand-slider-wrap .slick-track {
          display: flex;
          align-items: center;
        }

        .brand-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 150px;
        }

        .brand-logo {
          max-height: 120px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: transform 0.25s ease, filter 0.25s ease;
          background: transparent !important;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .brand-logo:hover { transform: scale(1.08); filter: brightness(1.08); }
        .brand-link { display: inline-flex; align-items: center; justify-content: center; }

        /* ===== Responsive layout ===== */
        @media (max-width: 1199px) {
          .about-row { flex-direction: column !important; }
          .about-image-col { order: 1 !important; padding-right: 0; }
          .about-text-col  { order: 2 !important; padding-left: 0; margin-top: 24px; }
          .about-content, .about-items .content { text-align: left; }
          .brand-slide { height: 120px; }
          .brand-logo { max-height: 100px; }
        }

        @media (max-width: 575px) {
          .about-content .section-title h2 { font-size: 26px; }
          .brand-title { font-size: 24px; margin-bottom: 14px; }
          .about-items { flex-direction: row; align-items: flex-start; }
          .about-items .icon { width: 52px; height: 52px; }
          .brand-slide { height: 96px; }
          .brand-logo { max-height: 78px; mix-blend-mode: darken; }
        }
      `}</style>

      <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="about-wrapper">
          <div className="row g-4 align-items-center mx-0 about-row">
            {/* Left Image */}
            <div className="col-12 col-xl-7 about-image-col d-flex">
              <div className="about-photo-wrap w-100">
                <img
                  src={aboutData?.banner_src || "/team1.jpg"}
                  alt="1 Global Enterprises Team"
                  className="about-photo"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="col-12 col-xl-5 about-text-col">
              <div className="about-content pe-xl-4 ps-xl-2 px-3 px-xl-0">
                <div className="section-title">
                  <h2>{aboutData?.main_title || "1 Global Enterprises"}</h2>
                </div>

                <div className="about-area mt-3">
                  <div className="about-items">
                    <div className="icon"><Users2 /></div>
                    <div className="content">
                      <h5>{aboutData?.who_we_are_title || "Who We Are"}</h5>
                      <p>{aboutData?.who_we_are_desc || "A diversified group with interests in Shipping, Logistics, Distribution, IT, Clean Energy & Trading."}</p>
                    </div>
                  </div>

                  <div className="about-items">
                    <div className="icon"><Globe2 /></div>
                    <div className="content">
                      <h5>{aboutData?.our_reach_title || "Our Reach"}</h5>
                      <p>{aboutData?.our_reach_desc || "A global workforce of 700+ professionals."}</p>
                    </div>
                  </div>

                  <div className="about-items">
                    <div className="icon"><BadgeCheck /></div>
                    <div className="content">
                      <h5>{aboutData?.expertise_title || "Expertise"}</h5>
                      <p>{aboutData?.expertise_desc || "Each business unit is led by experts ensuring sustainability, execution & growth."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Group Companies */}
          <div className="brand-block">
            <h3 className="brand-title">Group Companies</h3>
            <div className="brand-slider-wrap">
              <Slider {...sliderSettings}>
                {logos.map((item, i) => (
                  <div key={i} className="brand-slide">
                    <a
                      className="brand-link"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Open ${item.alt}`}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <img src={item.img} alt={item.alt} className="brand-logo" loading="lazy" />
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About1;
