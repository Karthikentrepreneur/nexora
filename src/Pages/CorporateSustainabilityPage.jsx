import React, { useEffect, useState } from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { getNavbarVerticals } from '../utils/navbarVerticalData';

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
  const imageSrc = verticalData?.image_src || "/renewable.png";
  const contentText = verticalData?.content || "At 1 Global Enterprises, sustainability is woven into every aspect of our business. We invest in renewable energy, reduce waste across our operations, and collaborate with partners who share our vision for a cleaner planet.\n\nOur initiatives include energy-efficient logistics, responsible sourcing, and support for community environmental programs. Together, these efforts help us minimize our footprint and create lasting value for future generations.\n\nWe believe that thriving communities and a healthy environment go hand in hand. Our corporate sustainability program empowers employees to volunteer, promotes diversity and inclusion, and ensures that growth never comes at the expense of the planet.";

  const paragraphs = contentText.split(/\n+/).map(p => p.trim()).filter(Boolean);

  // Split into first section and second section
  const section1Paragraphs = paragraphs.slice(0, 2);
  const section2Paragraphs = paragraphs.slice(2);

  return (
    <div>
      <BreadCumb bgimg="/aboutbg.png" Title={title} />
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <img src={imageSrc} alt={title} className="img-fluid rounded" />
            </div>
            <div className="col-md-6">
              <h2>Building a Greener Future</h2>
              {section1Paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
          {section2Paragraphs.length > 0 && (
            <div className="row">
              <div className="col-md-6 order-md-2">
                <img src="/about4.png" alt="People and Planet" className="img-fluid rounded" />
              </div>
              <div className="col-md-6 order-md-1">
                <h3>People and Planet</h3>
                {section2Paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CorporateSustainabilityPage;
