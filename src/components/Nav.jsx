import React from 'react';
import { NavLink } from 'react-router-dom';

// Sets the link for each topic
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/cars">Cars</NavLink></li>
        <li><NavLink to="/trees">Trees</NavLink></li>
        <li><NavLink to="/rabbits">Rabbits</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;