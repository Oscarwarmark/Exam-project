import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../Styles/Header.css";
import MobileNavigation from "./MobileNavigaton";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const location = useLocation();

  // Check if the current route is the admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    // If it's the admin page, don't render the header
    return null;
  }

  return (
    <div className="header">
      <div className="header-container">
        <div className="left-contatiner">
          <MobileNavigation />
        </div>
        <NavLink to="/" className="title">
          <h1 className="logo">Oscar Warmark</h1>
        </NavLink>
        <div className="buttons-container">
          <CartDrawer />
        </div>
      </div>
      <div className="navigation-container">
        <ul className="navlink-list">
          <li>
            <NavLink to="/">Hem</NavLink>
          </li>
          <li>
            <NavLink to="/Products">Produkter</NavLink>
          </li>
          <li>
            <NavLink to="/about">Om Oss</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Kontakt</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
