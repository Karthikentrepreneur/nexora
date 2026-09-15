import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import NexoraCapabilities from '../Components/Nexora/NexoraCapabilities';
import NexoraContact from '../Components/Nexora/NexoraContact';
import useSEO from '../hooks/useSEO';

const CapabilitiesPage = () => {
  useSEO('capabilities');

  return (
    <div className="nexora-capabilities-page">
      <BreadCumb
        bgimg="/aboutbg.png"
        Title="Capability Directory"
      />
      <NexoraCapabilities />
      <NexoraContact />
    </div>
  );
};

export default CapabilitiesPage;
