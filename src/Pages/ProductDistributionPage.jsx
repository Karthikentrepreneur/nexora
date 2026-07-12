import React, { useEffect, useState } from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { getNavbarVerticals } from '../utils/navbarVerticalData';

const ProductDistributionPage = () => {
  const [verticalData, setVerticalData] = useState(null);

  useEffect(() => {
    getNavbarVerticals().then((data) => {
      if (data) {
        const matched = data.find((item) => item.url_path === '/product-distribution');
        if (matched) {
          setVerticalData(matched);
        }
      }
    });
  }, []);

  const title = verticalData?.title || "Product Distribution";
  const imageSrc = verticalData?.image_src || "/product.png";
  const contentText = verticalData?.content || "Our product distribution services bridge the gap between manufacturers and consumers. We manage every stage of the distribution process, ensuring that products arrive in stores and homes exactly when they are needed.\n\nUtilizing strategic partnerships and advanced inventory systems, we are able to handle high volumes without sacrificing accuracy. Our teams monitor performance metrics closely to maintain the highest levels of service.\n\nFrom regional deliveries to international fulfillment, our distribution network is built for scalability. We adapt quickly to market changes, helping our clients expand their reach with confidence.";

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

export default ProductDistributionPage;
