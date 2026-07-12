import React, { useEffect, useState } from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { getNavbarVerticals } from '../utils/navbarVerticalData';
import useSEO from '../hooks/useSEO';

const ShippingPage = () => {
  useSEO('shipping');
  const [verticalData, setVerticalData] = useState(null);

  useEffect(() => {
    getNavbarVerticals().then((data) => {
      if (data) {
        const matched = data.find((item) => item.url_path === '/shipping');
        if (matched) {
          setVerticalData(matched);
        }
      }
    });
  }, []);

  const title = verticalData?.title || "Shipping";
  const imageSrc = verticalData?.image_src || "/shipping.png";
  const contentText = verticalData?.content || "Shipping is the backbone of global trade, moving goods across oceans and connecting markets on every continent. Our shipping services are built on reliability and efficiency, ensuring products reach their destinations on time and in perfect condition.\n\nFrom cargo management to route optimization, we leverage industry-leading technology to provide end-to-end solutions. Our fleet operates under the highest safety standards, and our experienced crews navigate the world's busiest ports with precision.\n\nWe are committed to sustainability, investing in cleaner fuels and modern vessels that reduce emissions. As global demand continues to grow, our shipping division remains dedicated to delivering exceptional service while minimizing environmental impact.";

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

export default ShippingPage;
