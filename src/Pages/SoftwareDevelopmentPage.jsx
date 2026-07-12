import React, { useEffect, useState } from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { getNavbarVerticals } from '../utils/navbarVerticalData';

const SoftwareDevelopmentPage = () => {
  const [verticalData, setVerticalData] = useState(null);

  useEffect(() => {
    getNavbarVerticals().then((data) => {
      if (data) {
        const matched = data.find((item) => item.url_path === '/software-development');
        if (matched) {
          setVerticalData(matched);
        }
      }
    });
  }, []);

  const title = verticalData?.title || "Software Development";
  const imageSrc = verticalData?.image_src || "/software.png";
  const contentText = verticalData?.content || "Our software development team creates innovative solutions that drive digital transformation. From web applications to complex enterprise systems, we build scalable products tailored to our clients' needs.\n\nWe follow modern development practices and emphasize collaboration, ensuring every project meets rigorous quality standards. Our developers are fluent in a variety of technologies, enabling rapid prototyping and reliable deployment.\n\nBeyond delivery, we provide ongoing support and optimization to keep software running smoothly. Our goal is to empower businesses with tools that enhance productivity and unlock new opportunities.";

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

export default SoftwareDevelopmentPage;
