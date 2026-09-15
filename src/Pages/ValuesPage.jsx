import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import NexoraValues from '../Components/Nexora/NexoraValues';
import NexoraCommitment from '../Components/Nexora/NexoraCommitment';
import useSEO from '../hooks/useSEO';

const ValuesPage = () => {
  useSEO('values');

  return (
    <div className="nexora-values-page">
      <BreadCumb
        bgimg="/aboutbg.png"
        Title="Our Core Values"
      />
      <NexoraValues />
      <NexoraCommitment />
    </div>
  );
};

export default ValuesPage;
