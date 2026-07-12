import React, { useState } from 'react';
import { addInquiry } from '../../utils/adminData';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setIsSuccess(false);
            setStatusMessage('Please fill in all required fields (Name, Email, and Message).');
            return;
        }
        setIsSubmitting(true);
        setStatusMessage('');

        // Simulate a minor API delay for professional feedback
        setTimeout(() => {
            addInquiry({
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'No Subject',
                message: formData.message
            });
            setIsSuccess(true);
            setStatusMessage('Thank you! Your message has been saved in the inquiries database.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 600);
    };

    return (
        <div>
            
         <section className="contact-us-section fix section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="contact-us-main">
                            <div className="contact-box-items">
                                <div className="icon">
                                    <img src="/assets/img/icon/18.svg" alt="img" />
                                </div>
                                <div className="content">
                                    <h3>
                                        Our Address
                                    </h3>
                                    <p>
                                        2464 Royal Ln. Mesa, New Jersey 45463.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="contact-us-main style-2">
                            <div className="contact-box-items">
                                <div className="icon">
                                    <img src="/assets/img/icon/19.svg" alt="img" />
                                </div>
                                <div className="content">
                                    <h3>
                                        <a href="mailto:info@tripco.com">info@tripco.com</a>
                                    </h3>
                                    <p>
                                        Email us anytime for anykind <br/> ofquety.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="contact-us-main">
                            <div className="contact-box-items">
                                <div className="icon">
                                    <img src="/assets/img/icon/20.svg" alt="img" />
                                </div>
                                <div className="content">
                                    <h3>
                                        <a href="tel:Hot+208-666-0112">Hot:+208-666-0112</a>
                                    </h3>
                                    <p>
                                        Call us any kind suppor,we will wait for it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </section>           

          <section className="contact-us-section-2 section-bg-2 fix">
            <div className="container">
                <div className="contact-us-wrapper">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="contact-us-contact">
                                <div className="section-title">
                                    <span className="sub-title text-white wow fadeInUp">
                                        Contact us
                                    </span>
                                    <h2 className=" text-white wow fadeInUp wow" data-wow-delay=".2s">
                                        Send Message Anytime
                                    </h2>
                                </div>
                                <div className="comment-form-wrap">
                                    <form onSubmit={handleSubmit} id="contact-form">
                                        <div className="row g-4">
                                            <div className="col-lg-6">
                                                <div className="form-clt">
                                                    <input 
                                                        type="text" 
                                                        name="name" 
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Your Name" 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-clt">
                                                    <input 
                                                        type="email" 
                                                        name="email" 
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Your Email" 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-clt">
                                                   <input 
                                                        type="text" 
                                                        name="subject" 
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        placeholder="Subject" 
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-clt">
                                                    <textarea 
                                                        name="message" 
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        placeholder="Your Message"
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <button type="submit" className="theme-btn" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Sending...' : 'Submit Message'}
                                                </button>
                                            </div>
                                            {statusMessage && (
                                                <div className="col-lg-12 mt-3">
                                                    <div style={{
                                                        padding: '12px 18px',
                                                        borderRadius: '6px',
                                                        backgroundColor: isSuccess ? '#e8f5e9' : '#ffebee',
                                                        color: isSuccess ? '#2e7d32' : '#c62828',
                                                        fontSize: '15px',
                                                        fontWeight: '500'
                                                    }}>
                                                        {statusMessage}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="map-area">
                                <div className="google-map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd"loading="lazy"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </section>           
        </div>
    );
};

export default Contact;