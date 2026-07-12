import React, { useEffect, useState } from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import { getNavbarVerticals } from '../utils/navbarVerticalData';

const RenewableEnergyPage = () => {
  const [verticalData, setVerticalData] = useState(null);

  useEffect(() => {
    getNavbarVerticals().then((data) => {
      if (data) {
        const matched = data.find((item) => item.url_path === '/renewable-energy');
        if (matched) {
          setVerticalData(matched);
        }
      }
    });
  }, []);

  const title = verticalData?.title || "Renewable Energy";
  const imageSrc = verticalData?.image_src || "/renewable.png";
  const contentText = verticalData?.content || "Renewable energy is central to a sustainable future. Our projects harness the power of wind, sun, and water to generate clean electricity and reduce dependence on fossil fuels.\n\nWe collaborate with communities and governments to develop energy solutions that are both economically and environmentally sound. Each installation is designed to maximize efficiency and minimize ecological impact.\n\nThrough continued research and investment, we aim to expand the reach of renewable technologies. Our commitment to green energy is helping to build a more resilient and responsible world.";

  const paragraphs = contentText.split(/\n+/).map(p => p.trim()).filter(Boolean);

  return (
    <div>
      <BreadCumb bgimg="/aboutbg.png" Title={title} />
      <section className="py-5">
        <div className="container">
          <img src={imageSrc} alt={title} className="mb-4 w-100" />
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RenewableEnergyPage;
