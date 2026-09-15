import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import NexoraContact from '../Components/Nexora/NexoraContact';
import useSEO from '../hooks/useSEO';

const ContactPage = () => {
  useSEO('contact');

  return (
    <div className="nexora-contact-page">
      <BreadCumb
        bgimg="/aboutbg.png"
        Title="Get in Touch"
      />
      <NexoraContact />

      {/* Chennai Headquarters Map Section */}
      <section className="contact-map-section pb-5 bg-white">
        <div className="container">
          <div className="map-wrapper rounded-4 overflow-hidden border border-danger border-opacity-25 shadow-sm">
            <iframe
              title="Nexora360 Chennai Headquarters"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.855359405624!2d80.1772421!3d12.9170132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d03a19b0ab9%3A0x4463dc682e0b5711!2sBollineni%20Hillside%20Phase%202!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;