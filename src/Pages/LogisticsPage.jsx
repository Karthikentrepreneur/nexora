import React, { useEffect, useState } from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { getNavbarVerticals } from '../utils/navbarVerticalData';
import useSEO from '../hooks/useSEO';

const LogisticsPage = () => {
  useSEO('logistics');
  const [verticalData, setVerticalData] = useState(null);

  useEffect(() => {
    getNavbarVerticals().then((data) => {
      if (data) {
        const matched = data.find((item) => item.url_path === '/logistics');
        if (matched) {
          setVerticalData(matched);
        }
      }
    });
  }, []);

  const title = verticalData?.title || "Logistics";
  const imageSrc = verticalData?.image_src || "/logistics.png";
  const contentText = verticalData?.content || "Efficient logistics are essential for keeping supply chains running smoothly. Our logistics team coordinates transportation, warehousing, and distribution to provide a seamless experience from origin to destination.\n\nWith a network that spans the globe, we offer customized solutions for businesses of all sizes. Advanced tracking systems give our clients real-time visibility, ensuring every shipment is accounted for at every step.\n\nWhether by land, sea, or air, our logistics services are designed to maximize speed and minimize cost. We continually refine our operations to meet the evolving needs of modern commerce.";

  const paragraphs = contentText.split(/\n+/).map(p => p.trim()).filter(Boolean);

  return (
    <div>
      <BreadCumb bgimg="/aboutbg.png" Title={title} />
      <section className="py-5">
        <div className="container">
          <img
            src={imageSrc}
            alt={title}
            className="mb-6 w-full h-60 object-cover rounded"
          />
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LogisticsPage;
