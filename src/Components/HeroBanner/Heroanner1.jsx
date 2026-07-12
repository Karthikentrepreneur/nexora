import React, { useEffect, useState } from 'react';
import Header3 from '../Header/Header3';
import { getHomeHero } from '../../utils/homeHeroData';

const Heroanner1 = () => {
  const [heroContent, setHeroContent] = useState({
    subtitle: 'Sustainability Through Innovation',
    title: '“Strategic investments for a sustainable, connected future.”',
    video_src: 'video4.mp4'
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      const data = await getHomeHero();
      if (data) {
        setHeroContent(data);
      }
    };
    fetchHeroData();
  }, []);

  return (
    <section className="hero-section">
      <Header3 variant="header-transparent" />

      {/* Import Montserrat font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .hero-section {
          position: relative;
          background: transparent;
        }

        .hero-section .cs_site_header_spacing_140 {
          display: none;
        }

        .header-transparent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: transparent;
          z-index: 3;
        }

        .header-transparent .cs_top_header,
        .header-transparent .cs_main_header {
          background: transparent;
        }

        .hero-1 {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 8%;
        }

        /* ✅ Background video layer */
        .video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .video-bg video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* ✅ Overlay layers */
        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(40, 40, 40, 0.8) 0%,   /* Dark grey on left */
            rgba(40, 40, 40, 0.4) 30%,  /* Soft mid fade */
            rgba(0, 0, 0, 0.1) 70%,     /* Light near center */
            rgba(0, 0, 0, 0) 100%       /* Fully transparent right */
          );
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          color: #fff;
          text-align: left;
          max-width: 650px;
          font-family: 'Montserrat', sans-serif;
        }

        .hero-content h1 {
          font-size: 2.2rem; /* ⬇️ Decreased from 2.8rem */
          font-weight: 700;
          line-height: 1.3;
          margin-top: 15px;
        }

        .hero-content .sub-title {
          font-size: 1.4rem;
          font-weight: 600;
          opacity: 0.95;
          color: #e0e0e0;
          letter-spacing: 0.8px;
        }

        @media (max-width: 768px) {
          .hero-1 {
            padding-left: 5%;
          }

          .hero-content h1 {
            font-size: 1.6rem; /* ⬇️ Reduced mobile size too */
          }

          .hero-content .sub-title {
            font-size: 1.1rem;
          }

          .video-overlay {
            background: linear-gradient(
              90deg,
              rgba(40, 40, 40, 0.9) 0%,
              rgba(40, 40, 40, 0.6) 40%,
              rgba(0, 0, 0, 0.2) 80%,
              rgba(0, 0, 0, 0) 100%
            );
          }
        }
      `}</style>

      <div className="hero-1">
        {/* ✅ Background video */}
        <div className="video-bg" aria-hidden="true">
          <video
            src={heroContent.video_src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            key={heroContent.video_src}
          />
        </div>

        {/* ✅ New Left-Side Grey Gradient Overlay */}
        <div className="video-overlay" />

        <div className="hero-content">
          <div className="sub-title">{heroContent.subtitle}</div>
          <h1>{heroContent.title}</h1>
        </div>
      </div>
    </section>
  );
};

export default Heroanner1;
