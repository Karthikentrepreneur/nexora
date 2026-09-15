import React, { useState } from 'react';
import { CAPABILITIES } from '../../utils/capabilityData';
import { addInquiry } from '../../utils/adminData';
import { Mail, Phone, MapPin, Building, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const NexoraContact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    workEmail: '',
    capability: 'Global Capability Centre (GCC) Solutions',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.message) {
      setStatus({
        type: 'error',
        text: 'Please fill in all required fields (Name, Work Email, and What you want to outsource).'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    // Simulate sending & save to inquiry database
    setTimeout(() => {
      addInquiry({
        name: formData.fullName,
        email: formData.workEmail,
        subject: `Capability Inquiry: ${formData.capability} (${formData.company || 'Individual'})`,
        message: `Company: ${formData.company}\nCapability Needed: ${formData.capability}\nDetails:\n${formData.message}`
      });

      setIsSubmitting(false);
      setStatus({
        type: 'success',
        text: 'Thank you for reaching out! Your inquiry has been received. Our capability team will connect with you shortly.'
      });
      setFormData({
        fullName: '',
        company: '',
        workEmail: '',
        capability: 'Global Capability Centre (GCC) Solutions',
        message: ''
      });
    }, 600);
  };

  return (
    <section className="contact-nexora-section py-5 position-relative" id="contact">
      <div className="container py-lg-5">
        
        {/* Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-9">
            <span className="nexora-section-badge">GET IN TOUCH</span>
            <h2 className="nexora-section-title mt-2">
              Tell us what you'd rather <span className="text-gradient-nexora">not manage yourself.</span>
            </h2>
            <p className="nexora-lead-text mx-auto mt-3">
              Whether it's one process, one department, or your complete business-support operation — we'll build the team and workflow around it.
            </p>
          </div>
        </div>

        <div className="row g-5">
          {/* Left Column: Company & Office Information */}
          <div className="col-lg-5">
            <div className="contact-info-panel h-100 p-4 p-lg-5">
              <h3 className="panel-title mb-4">Nexora360 Global Solutions</h3>

              <div className="info-item mb-4">
                <div className="info-icon-box">
                  <Building size={20} className="text-danger" />
                </div>
                <div>
                  <span className="info-label">Company</span>
                  <p className="info-value">Nexora360 Global Solutions Pvt. Ltd.</p>
                </div>
              </div>

              <div className="info-item mb-4">
                <div className="info-icon-box">
                  <Mail size={20} className="text-danger" />
                </div>
                <div>
                  <span className="info-label">Email</span>
                  <p className="info-value">
                    <a href="mailto:info@nexora360global.com" className="text-white text-decoration-none hover-orange">
                      info@nexora360global.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-item mb-4">
                <div className="info-icon-box">
                  <Phone size={20} className="text-danger" />
                </div>
                <div>
                  <span className="info-label">Phone</span>
                  <p className="info-value">
                    <a href="tel:+919655680234" className="text-white text-decoration-none hover-orange">
                      +91 96556 80234
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-item mb-4">
                <div className="info-icon-box">
                  <MapPin size={20} className="text-danger" />
                </div>
                <div>
                  <span className="info-label">Address</span>
                  <p className="info-value mb-0" style={{ lineHeight: '1.6' }}>
                    ED-305, Bollineni Hillside Phase 2,<br />
                    Perumbakkam, Chennai 600126
                  </p>
                </div>
              </div>

              <div className="trusted-promise-box mt-4 p-3">
                <span className="promise-title text-uppercase font-monospace text-warning fw-bold d-block mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                  OUR OPERATING GUARANTEE
                </span>
                <p className="promise-text text-slate-300 mb-0" style={{ fontSize: '13.5px', color: '#CBD5E1' }}>
                  Transparent communication, dedicated capability leads, and rapid onboarding tailored to your business model.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="col-lg-7">
            <div className="contact-form-panel p-4 p-lg-5">
              <h3 className="form-title mb-2">Start a conversation</h3>
              <p className="form-sub mb-4">
                Tell us about your organization and how we can support your growth.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  
                  {/* Full Name */}
                  <div className="col-md-6">
                    <div className="form-group-custom">
                      <label htmlFor="fullName">Full name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="form-control-custom"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="col-md-6">
                    <div className="form-group-custom">
                      <label htmlFor="company">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="form-control-custom"
                        placeholder="e.g. Acme Corp"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div className="col-md-6">
                    <div className="form-group-custom">
                      <label htmlFor="workEmail">Work email *</label>
                      <input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        className="form-control-custom"
                        placeholder="sarah@acme.com"
                        value={formData.workEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Capability You Need */}
                  <div className="col-md-6">
                    <div className="form-group-custom">
                      <label htmlFor="capability">Capability you need</label>
                      <select
                        id="capability"
                        name="capability"
                        className="form-select-custom"
                        value={formData.capability}
                        onChange={handleChange}
                      >
                        {CAPABILITIES.map((cap) => (
                          <option key={cap.id} value={cap.title}>
                            {cap.id} — {cap.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* What are you looking to outsource? */}
                  <div className="col-12">
                    <div className="form-group-custom">
                      <label htmlFor="message">What are you looking to outsource? *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="form-control-custom"
                        placeholder="Describe the processes, team size, tools, or goals you'd rather not manage yourself..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Status Banner */}
                  {status.text && (
                    <div className="col-12">
                      <div className={`status-feedback ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                        {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span>{status.text}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn-nexora-primary w-100 justify-content-center py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send message</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                    
                    <p className="form-disclaimer-note mt-3 text-center mb-0">
                      This form is front-end only — connect it to your inbox or CRM before publishing.
                    </p>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .contact-nexora-section {
          background: #FFFFFF;
          color: #0F172A;
        }
        .contact-info-panel {
          background: #0B0F17;
          border-radius: 20px;
          border: 1px solid rgba(220, 38, 38, 0.3);
          color: #FFFFFF;
        }
        .panel-title {
          font-size: 24px;
          font-weight: 800;
          color: #FFFFFF;
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .info-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(220, 38, 38, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(220, 38, 38, 0.3);
        }
        .info-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #F97316;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .info-value {
          font-size: 15px;
          color: #FFFFFF;
          margin-bottom: 0;
          font-weight: 500;
        }
        .hover-orange:hover {
          color: #FF5722 !important;
        }
        .trusted-promise-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px dashed rgba(249, 115, 22, 0.3);
          border-radius: 12px;
        }
        .contact-form-panel {
          background: #FAFAFA;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
        }
        .form-title {
          font-size: 24px;
          font-weight: 800;
          color: #0F172A;
        }
        .form-sub {
          color: #64748B;
          font-size: 15px;
        }
        .form-group-custom label {
          display: block;
          font-size: 13.5px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 6px;
        }
        .form-control-custom,
        .form-select-custom {
          width: 100%;
          padding: 12px 16px;
          font-size: 14.5px;
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 10px;
          color: #0F172A;
          transition: all 0.25s ease;
          outline: none;
        }
        .form-control-custom:focus,
        .form-select-custom:focus {
          border-color: #DC2626;
          box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.12);
        }
        .status-feedback {
          padding: 12px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
        }
        .status-success {
          background: #DCFCE7;
          color: #15803D;
          border: 1px solid #86EFAC;
        }
        .status-error {
          background: #FEE2E2;
          color: #B91C1C;
          border: 1px solid #FCA5A5;
        }
        .form-disclaimer-note {
          font-size: 12.5px;
          color: #94A3B8;
          font-style: italic;
        }
      `}</style>
    </section>
  );
};

export default NexoraContact;
