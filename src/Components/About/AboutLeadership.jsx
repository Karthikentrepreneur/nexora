import React, { useEffect, useState } from 'react';
import loadBackgroudImages from '../Common/loadBackgroudImages';
import { Users2, HeartHandshake, Globe2 } from 'lucide-react';
import { getLeadershipDetails } from '../../utils/leadershipData';

const AboutLeadership = () => {
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    loadBackgroudImages();
    getLeadershipDetails().then(data => {
      if (data) {
        setLeadData(data);
      }
    });
  }, []);

  const b1Title = leadData?.block_1_title || "Our People, Our Strength";
  const b1Desc = leadData?.block_1_desc || "At 1 Global Enterprises, our greatest strength is our people. Across every division and region, it is the passion, creativity, and commitment of our employees that turn ideas into real impact. Their dedication drives innovation, builds trust with our partners, and fuels the progress that defines who we are as a company.";
  const b2Title = leadData?.block_2_title || "Leadership That Empowers";
  const b2Desc = leadData?.block_2_desc || "JP, the Managing Director and Founder of 1 Global Enterprises, believes that true leadership begins with empowering others. He attributes the company’s growth and success to the collective effort of a talented and diverse team that shares a common purpose — creating meaningful progress for our people and our customers.";
  const b3Title = leadData?.block_3_title || "Vision for Lasting Impact";
  const b3Desc = leadData?.block_3_desc || "Under JP’s guidance, 1 Global Enterprises has evolved into a group of businesses spanning renewable energy, sustainable supply chain solutions, software innovation, and responsible product distribution. His vision proves that commercial excellence and social responsibility can coexist — empowering communities, advancing cleaner technologies, and creating lasting value for generations to come through collaboration and having a long term vision.";
  const founderImg = leadData?.founder_img || "/founder.jpg";
  const founderName = leadData?.founder_name || "Mr. Jay Prakash";
  const founderTitle = leadData?.founder_title || "Managing Director & Founder";

  return (
    <section
      className="about-section bg-cover"
      data-background="/about-bg.png"
      style={{ padding: '56px 0 24px', overflow: 'hidden' }}
    >
      <style>{`
        .about-wrapper { width: 100%; }

        /* Layout spacing */
        @media (min-width: 992px) {
          .about-content-wrap { margin-right: 40px; }
        }

        /* JP Image — full height, square, occupies right column */
        .founder-photo-wrap {
          width: 100%;
          text-align: center;
        }
        .founder-photo {
          width: 100%;
          max-width: 600px;
          aspect-ratio: 1 / 1; /* makes it a perfect square */
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 16px 50px rgba(0,0,0,.25);
          transition: transform .35s ease, box-shadow .35s ease;
        }
        .founder-photo:hover {
          transform: scale(1.03);
          box-shadow: 0 20px 60px rgba(0,0,0,.3);
        }
        .founder-caption {
          margin-top: 16px;
          text-align: center;
          font-weight: 600;
          font-size: 18px;
          color: #0E0F2C;
        }
        .founder-caption span {
          display: block;
          font-size: 15px;
          color: #26B6E0;
          font-weight: 500;
        }

        /* Content icons and layout */
        .about-items {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 28px;
        }
        .about-items .icon {
          width: 60px;
          height: 60px;
          min-width: 60px;
          border-radius: 50%;
          background-color: #26B6E0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          box-shadow: 0 4px 10px rgba(38,182,224,0.35);
        }
        .about-items .icon svg { width: 28px; height: 28px; color: #fff; }

        .about-items:not(:last-child)::after {
          content: "";
          position: absolute;
          left: 29px;
          top: 60px;
          width: 2px;
          height: calc(100% - 30px);
          background: repeating-linear-gradient(
            to bottom,
            #26B6E0,
            #26B6E0 4px,
            transparent 4px,
            transparent 8px
          );
        }

        .about-items .content h5 {
          font-weight: 700;
          margin-bottom: 6px;
          color: #0E0F2C;
        }
        .about-items .content p {
          margin: 0;
          line-height: 1.55;
          color: #444;
          font-size: 15.5px;
        }

        /* Responsive tweaks */
        @media (max-width: 1199px) {
          .founder-photo { max-width: 500px; }
        }
        @media (max-width: 991px) {
          .about-section { padding: 40px 0 16px !important; }
          .founder-photo { width: 100%; max-width: 400px; border-radius: 12px; }
          .about-content-wrap { margin-right: 0; }
        }
      `}</style>

      <div className="container">
        <div className="about-wrapper">
          <div className="row g-4 align-items-center">
            {/* LEFT CONTENT */}
            <div className="col-lg-7">
              <div className="about-content about-content-wrap">
                

                {/* Block 1 */}
                <div className="about-items">
                  <div className="icon"><Users2 /></div>
                  <div className="content">
                    <h5>{b1Title}</h5>
                    <p>{b1Desc}</p>
                  </div>
                </div>

                {/* Block 2 */}
                <div className="about-items">
                  <div className="icon"><HeartHandshake /></div>
                  <div className="content">
                    <h5>{b2Title}</h5>
                    <p>{b2Desc}</p>
                  </div>
                </div>

                {/* Block 3 */}
                <div className="about-items">
                  <div className="icon"><Globe2 /></div>
                  <div className="content">
                    <h5>{b3Title}</h5>
                    <p>{b3Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE — MR. JAY PRAKASH */}
            <div className="col-lg-5 d-flex flex-column align-items-center">
              <div className="founder-photo-wrap">
                <img
                  src={founderImg}
                  alt={`${founderName} – ${founderTitle}`}
                  className="founder-photo"
                />
              </div>
              <div className="founder-caption">
                {founderName}
                <span>{founderTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLeadership;
