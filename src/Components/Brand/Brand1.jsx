// src/Components/Brand/Brand1.jsx
import React from "react";
import Slider from "react-slick";

function Brand1() {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3200,
    pauseOnHover: true,
    fade: true,
    adaptiveHeight: true,
    appendDots: (dots) => <ul className="brand-dots">{dots}</ul>,
    customPaging: () => <button type="button" aria-label="Show brand" />,
  };

  const logos = [
    { img: "/brand-logos/ggl.svg", alt: "Global Gateway Logistics" },
    { img: "/brand-logos/oecl.svg", alt: "OECL Supply Chain" },
    { img: "/brand-logos/global-consol.svg", alt: "Global Consol" },
    { img: "/brand-logos/hai-xun.svg", alt: "Hai Xun Logistics" },
    { img: "/brand-logos/one-global-logistics.svg", alt: "ONE Global Logistics" },
    { img: "/brand-logos/moltech.svg", alt: "Moltech Energy" },
    { img: "/brand-logos/moltechgen.svg", alt: "MoltechGen" },
    { img: "/brand-logos/superenergy.svg", alt: "Superenergy Renewables" },
    { img: "/brand-logos/citygn.svg", alt: "CityGn Distribution" },
  ];

  return (
    <section className="brand-section section-padding pt-0">
      <style>{`
        .brand-section {
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at top left, rgba(38, 182, 224, 0.16), transparent 58%),
            radial-gradient(circle at bottom right, rgba(18, 52, 86, 0.12), transparent 60%);
        }

        .brand-section::before,
        .brand-section::after {
          content: "";
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          z-index: 0;
        }

        .brand-section::before {
          top: -120px;
          left: -80px;
          background: rgba(38, 182, 224, 0.45);
        }

        .brand-section::after {
          bottom: -140px;
          right: -90px;
          background: rgba(13, 30, 64, 0.45);
        }

        .brand-wrapper {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .brand-title {
          margin-bottom: 28px;
          color: #0b1a33;
          font-size: 28px;
          font-weight: 700;
        }

        .brand-slide {
          display: flex !important;
          align-items: center;
          justify-content: center;
        }

        .brand-card {
          width: min(420px, 100%);
          margin: 0 auto;
          padding: 36px 18px;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(14, 31, 59, 0.92), rgba(38, 182, 224, 0.85));
          box-shadow: 0 18px 45px rgba(11, 41, 77, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          position: relative;
        }

        .brand-card::after {
          content: "";
          position: absolute;
          inset: 12px;
          border-radius: 24px;
          border: 1px dashed rgba(255, 255, 255, 0.32);
          pointer-events: none;
        }

        .brand-card img {
          width: 100%;
          max-width: 240px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 22px rgba(10, 20, 38, 0.45));
        }

        .brand-dots {
          margin: 26px 0 0;
          padding: 0;
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 12px;
          list-style: none;
        }

        .brand-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: none;
          background: rgba(10, 20, 38, 0.25);
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .brand-dots li.slick-active button {
          width: 30px;
          background: linear-gradient(135deg, #26b6e0, #1173b7);
        }

        @media (max-width: 767px) {
          .brand-title {
            font-size: 24px;
          }

          .brand-card {
            padding: 28px 16px;
            border-radius: 24px;
          }

          .brand-card::after {
            border-radius: 20px;
          }

          .brand-card img {
            max-width: 200px;
          }
        }
      `}</style>

      <div className="container">
        <div className="brand-wrapper">
          <h4 className="brand-title wow fadeInUp" data-wow-delay=".3s">
            Group Companies
          </h4>

          <Slider {...settings}>
            {logos.map((item, i) => (
              <div key={i} className="brand-slide">
                <div className="brand-card">
                  <img src={item.img} alt={item.alt} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Brand1;
