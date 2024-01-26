import "../styles/MobileNavigation.css";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function MobileNavigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: { width: "100%" },
        }}
      >
        <div className="mobile-navigation-container">
          <h1>Oscars Webbshop</h1>
          <ul className="mobile-navlinks">
            <li onClick={() => setIsDrawerOpen(false)}>
              <NavLink to="/">Hem</NavLink>
            </li>
            <li onClick={() => setIsDrawerOpen(false)}>
              <NavLink to="/Products">Produkter</NavLink>
            </li>
            <li onClick={() => setIsDrawerOpen(false)}>
              <NavLink to="/about">Om Oss</NavLink>
            </li>
            <li onClick={() => setIsDrawerOpen(false)}>
              <NavLink to="/contact">Kontakt</NavLink>
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
}

export default MobileNavigation;
