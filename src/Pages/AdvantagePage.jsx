import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import NexoraAdvantage from '../Components/Nexora/NexoraAdvantage';
import NexoraCommitment from '../Components/Nexora/NexoraCommitment';
import NexoraContact from '../Components/Nexora/NexoraContact';
import useSEO from '../hooks/useSEO';

const AdvantagePage = () => {
  useSEO('advantage');

  return (
    <div className="nexora-advantage-page">
      <BreadCumb
        bgimg="/aboutbg.png"
        Title="The 360° Advantage"
      />
      <NexoraAdvantage />
      <NexoraCommitment />
      <NexoraContact />
    </div>
  );
};

export default AdvantagePage;
