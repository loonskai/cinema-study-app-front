import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <NavLink to="/">Main Page</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </header>
  );
};

export default Header;
