import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <header className="header">
      <nav className="container">
        <NavLink to="/" className="logo-name">Calorie tracker</NavLink>
      </nav>
    </header>
  );
};

export default NavBar;