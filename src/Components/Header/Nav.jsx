import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import { Link } from "react-router";
import { getNavbarVerticals } from '../../utils/navbarVerticalData';

export default function Nav({ setMobileToggle, linkColor }) {
  const [verticals, setVerticals] = useState([]);

  useEffect(() => {
    getNavbarVerticals().then(data => {
      if (data) {
        // Only show active verticals in the menu
        setVerticals(data.filter(item => Number(item.is_active) === 1));
      }
    });
  }, []);

  return (
    <ul className="cs_nav_list fw-medium">
      <li>
        <Link to="/" style={{ color: linkColor || '#fff' }}>Home</Link>
      </li>

      <li>
        <Link
          to="/about"
          onClick={() => setMobileToggle(false)}
          style={{ color: linkColor || '#fff' }}
        >
          About Us
        </Link>
      </li>

      <li>
        <Link
          to="/our-business-verticals"
          onClick={() => setMobileToggle(false)}
          style={{ color: linkColor || '#fff' }}
        >
          Business Verticals
        </Link>
      </li>
    </ul>
  );
}
