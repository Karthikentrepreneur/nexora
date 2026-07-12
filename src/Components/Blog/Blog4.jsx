import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getBlogs } from '../../utils/blogData';

const Blog4 = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(data => setBlogs(data || []));
  }, []);

  return (
    <section className="news-section section-padding fix">
      <div className="container">
        <div className="row g-4">
          {blogs.map((item, i) => (
            <div
              key={item.id || i}
              className="col-xl-4 col-md-6 col-lg-6 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="news-card-items-3 style-4">
                <div className="news-image">
                  <img src={item.img || '/blog1.png'} alt={item.title} />
                </div>
                <div className="news-content">
                  <ul className="post-meta">
                    <li className="post">
                      {item.date}
                      <span>{item.month}</span>
                    </li>
                    <li>
                      <i className="bi bi-person"></i>
                      By {item.author}
                    </li>
                    <li>
                      <i className="bi bi-tag-fill"></i>
                      {item.tag}
                    </li>
                  </ul>
                  <h4>
                    <Link to="/blog/blog-details">{item.title}</Link>
                  </h4>
                  <Link to="/blog/blog-details" className="link-btn">
                    Read More <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog4;
