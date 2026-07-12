import React from 'react';
import { Link } from 'react-router';

const Team2 = () => {
  const teamContent = [
    {
      img: '/1.png',
      name: 'John Smith',
      content: 'Operations Manager',
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
    {
      img: '/2.png', // 👩 female image
      name: 'Emily Johnson',
      content: 'Head of Marketing',
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
    {
      img: '/3.png',
      name: 'Michael Lee',
      content: 'Logistics Specialist',
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
    {
      img: '/4.png',
      name: 'Sophia Williams',
      content: 'Sustainability Lead',
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
  ];

  return (
    <section className="team-section fix section-padding">
      <div className="container">
        <div className="row g-4">
          {teamContent.map((item, i) => (
            <div
              key={i}
              className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp text-white"
              data-wow-delay=".2s"
            >
              <div className="team-card-item mt-0">
                <div className="team-image">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="team-content">
                  <h4>
                    <Link to="/team/team-details">{item.name}</Link>
                  </h4>
                  <p>{item.content}</p>
                  <div className="social-profile">
                    <ul>
                      <li>
                        <a href={item.facebook}>
                          <i className="bi bi-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.twitter}>
                          <i className="bi bi-twitter-x"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.linkedin}>
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.instagram}>
                          <i className="bi bi-instagram"></i>
                        </a>
                      </li>
                    </ul>
                    <span className="plus-btn">
                      <i className="bi bi-share"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team2;
