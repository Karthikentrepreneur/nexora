import React from 'react';
import { NavLink, useLocation } from "react-router";

export default function Nav({ setMobileToggle, linkColor }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleNavClick = (anchorId) => {
    setMobileToggle(false);
    if (isHome && anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: "Home", to: "/", anchor: "hero" },
    { label: "About", to: "/about", anchor: "about" },
    { label: "Values", to: "/values", anchor: "values" },
    { label: "Capabilities", to: "/capabilities", anchor: "capabilities" },
    { label: "The Advantage", to: "/the-advantage", anchor: "advantage" },
    { label: "Contact", to: "/contact", anchor: "contact" },
  ];

  return (
    <ul className="cs_nav_list fw-medium d-flex align-items-center gap-4 list-unstyled mb-0">
      {navItems.map((item) => (
        <li key={item.to} className="position-relative">
          <NavLink
            to={item.to}
            onClick={() => handleNavClick(item.anchor)}
            style={({ isActive }) => ({
              color: isActive ? '#FF5722' : (linkColor || '#0F172A'),
              fontWeight: isActive ? '700' : '600',
              fontSize: '15.5px',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              padding: '6px 0',
              position: 'relative'
            })}
            className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
