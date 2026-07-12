import React from 'react';
import { Link } from 'react-router';

const Blog1 = () => {
    return (
        <section className="news-section section-padding fix">
            <div className="container">
                <div className="section-title text-center">
                    <span className="sub-title wow fadeInUp">
                        News & Updates
                    </span>
                    <h2 className="wow fadeInUp wow" data-wow-delay=".2s">
                        Business Insights & Articles
                    </h2>
                </div>
                <div className="row">
                    {/* Article 1 */}
                    <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                        <div className="news-card-items">
                            <div className="news-image">
                                <img src="/blog1.png" alt="Business Growth" />
                            </div>
                            <div className="news-content">
                                <ul className="post-meta">
                                    <li><i className="bi bi-calendar"></i> August 25, 2025</li>
                                    <li><i className="bi bi-tag-fill"></i> Business Strategy</li>
                                </ul>
                                <h3>
                                    <Link to="/blog/business-growth">
                                        Top Strategies for Scaling Your Business in 2025
                                    </Link>
                                </h3>
                                <Link to="/blog/business-growth" className="link-btn">
                                    Read More <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Article 2 */}
                    <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                        <div className="news-card-items">
                            <div className="news-image">
                                <img src="/blog2.png" alt="Digital Transformation" />
                            </div>
                            <div className="news-content">
                                <ul className="post-meta">
                                    <li><i className="bi bi-calendar"></i> August 18, 2025</li>
                                    <li><i className="bi bi-tag-fill"></i> Digital Innovation</li>
                                </ul>
                                <h3>
                                    <Link to="/blog/digital-transformation">
                                        How Digital Transformation is Shaping Global Markets
                                    </Link>
                                </h3>
                                <Link to="/blog/digital-transformation" className="link-btn">
                                    Read More <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Article 3 */}
                    <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                        <div className="news-card-items">
                            <div className="news-image">
                                <img src="/blog3.png" alt="Sustainability" />
                            </div>
                            <div className="news-content">
                                <ul className="post-meta">
                                    <li><i className="bi bi-calendar"></i> August 10, 2025</li>
                                    <li><i className="bi bi-tag-fill"></i> Sustainability</li>
                                </ul>
                                <h3>
                                    <Link to="/blog/sustainable-business">
                                        Building Sustainable Business Models for the Future
                                    </Link>
                                </h3>
                                <Link to="/blog/sustainable-business" className="link-btn">
                                    Read More <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog1;
