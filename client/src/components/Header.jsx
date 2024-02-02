import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../Styles/Header.css";
import MobileNavigation from "./MobileNavigaton";
import CartDrawer from "./CartDrawer";
import AdminNavigation from "./AdminNavigation";

// Only renders on pages that dont start with "/admin"

const Header = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    return <AdminNavigation />;
  }

  return (
    <div className="header">
      <div className="header-container">
        <div className="left-container">
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
            <NavLink to="/about">Om </NavLink>
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
