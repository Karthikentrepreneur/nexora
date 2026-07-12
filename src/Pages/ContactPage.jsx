import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import Contact from '../Components/Contact/Contact';
import useSEO from '../hooks/useSEO';

const ContactPage = () => {
    useSEO('contact');
    return (
        <div>
            <BreadCumb
                bgimg="/assets/img/breadcrumb/breadcrumb.jpg"
                Title="Contact Us"
            ></BreadCumb>
            <Contact></Contact>     
        </div>
    );
};

export default ContactPage;