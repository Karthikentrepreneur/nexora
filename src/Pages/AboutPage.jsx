import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import AboutSimple from '../Components/About/AboutSimple';
import AboutLeadership from '../Components/About/AboutLeadership';
import Choose1 from '../Components/Choose/Choose1';
import Counter4 from '../Components/Counter/Counter4';
import Team1 from '../Components/Team/Team1';
import Testimonial3 from '../Components/Testimonial/Testimonial3';
import Instagram2 from '../Components/Instagram/Instagram2';
import useSEO from '../hooks/useSEO';

const AboutPage = () => {
    useSEO('about');
    return (
        <div>
            <BreadCumb
                bgimg="/aboutbg.png"
                Title="About Us"
            ></BreadCumb>
            <AboutSimple></AboutSimple>
        <AboutLeadership></AboutLeadership>
        </div>
    );
};

export default AboutPage;
