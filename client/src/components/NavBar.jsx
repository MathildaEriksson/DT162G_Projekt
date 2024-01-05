import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hem</Link>
        </li>
        <li>
          <Link to="/login">Logga In</Link>
        </li>
        <li>
          <Link to="/register">Registrera</Link>
        </li>
        <li>
          <Link to="/my-pages">Mina sidor</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
