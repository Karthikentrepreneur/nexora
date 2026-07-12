import React, { useEffect } from 'react';
import loadBackgroudImages from '../Common/loadBackgroudImages';
import { Link } from 'react-router';

const Choose1 = () => {

  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return (
    <section
      className="feature-section section-padding fix"
      data-background="/assets/img/office-bg.jpg"
    >
      <div className="shape-1 float-bob-y">
        <img src="/assets/img/shape/strategy1.png" alt="shape" />
      </div>
      <div className="shape-2 float-bob-x">
        <img src="/assets/img/shape/strategy2.png" alt="shape" />
      </div>
      <div className="container">
        <div className="feature-wrapper">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="feature-content">
                <div className="section-title">
                  <span className="sub-title wow fadeInUp">
                    Ready to grow your business?
                  </span>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">
                    Your Trusted Partner in Digital Marketing & Growth
                  </h2>
                </div>
                <p className="wow fadeInUp" data-wow-delay=".3s">
                  We help brands unlock their full potential with data-driven
                  marketing strategies, creative campaigns, and performance
                  solutions that deliver real results. From SEO to paid media,
                  we ensure your business gets noticed by the right audience.
                </p>
                <div className="feature-area">
                  <div className="line-shape">
                    <img src="/assets/img/line-shape.png" alt="line" />
                  </div>
                  <div
                    className="feature-items wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <div className="feature-icon-item">
                      <div className="icon">
                        <img src="/assets/img/icon/seo.svg" alt="icon" />
                      </div>
                      <div className="content">
                        <h5>
                          Proven SEO <br />
                          & Performance Marketing
                        </h5>
                      </div>
                    </div>
                    <ul className="circle-icon">
                      <li>
                        <i className="fa-solid fa-badge-check"></i>
                      </li>
                      <li>
                        <span>
                          Drive organic traffic and boost visibility with
                          tailored search strategies.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="feature-items wow fadeInUp"
                    data-wow-delay=".7s"
                  >
                    <div className="feature-icon-item">
                      <div className="icon">
                        <img src="/assets/img/icon/ads.svg" alt="icon" />
                      </div>
                      <div className="content">
                        <h5>
                          ROI-Focused <br />
                          Paid Advertising
                        </h5>
                      </div>
                    </div>
                    <ul className="circle-icon">
                      <li>
                        <i className="fa-solid fa-badge-check"></i>
                      </li>
                      <li>
                        <span>
                          Maximize conversions with data-driven ad campaigns
                          across Google, Meta & more.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="theme-btn wow fadeInUp"
                  data-wow-delay=".9s"
                >
                  Contact Us <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-image wow img-custom-anim-left">
                <img src="/assets/img/marketing-team.png" alt="team" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose1;
