import React from 'react';
import NexoraHero from '../Components/Nexora/NexoraHero';
import NexoraAbout from '../Components/Nexora/NexoraAbout';
import NexoraValues from '../Components/Nexora/NexoraValues';
import NexoraCapabilities from '../Components/Nexora/NexoraCapabilities';
import NexoraAdvantage from '../Components/Nexora/NexoraAdvantage';
import NexoraCommitment from '../Components/Nexora/NexoraCommitment';
import NexoraContact from '../Components/Nexora/NexoraContact';
import useSEO from '../hooks/useSEO';

const Home = () => {
  useSEO('home');

  return (
    <div className="nexora-home-page">
      {/* 01. Hero Section */}
      <NexoraHero />

      {/* 02. About Nexora360 Section */}
      <NexoraAbout />

      {/* 03. Core Values (N-E-X-O-R-A-360) Section */}
      <NexoraValues />

      {/* 04. Capability Directory (13 capabilities with interactive modal) */}
      <NexoraCapabilities />

      {/* 05. The Nexora360 360° Advantage Section */}
      <NexoraAdvantage />

      {/* 06. Commitments, Vision & Mission Section */}
      <NexoraCommitment />

      {/* 07. Contact & Capability Inquiry Section */}
      <NexoraContact />
    </div>
  );
};

export default Home;
