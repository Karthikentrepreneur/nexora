import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import ActivitiesIntro from '../Components/Activities/ActivitiesIntro';
import Activities from '../Components/Activities/Activities';

const ActivitiesPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/activities.png"
        Title="Business Verticals"
      ></BreadCumb>
      <Activities></Activities>
    </div>
  );
};

export default ActivitiesPage;
