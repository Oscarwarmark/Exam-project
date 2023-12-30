import { NavLink } from "react-router-dom";
import "../Styles/Header.css";
import { useContext } from "react";
import { MyCartContext } from "../context/CartContext";
import MobileNavigation from "./MobileNavigaton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

const Header = () => {
  const { cartItems, cartQuantity } = useContext(MyCartContext);

  return (
    <div className="header">
      <div className="header-container">
        <div className="left-contatiner">
          <MobileNavigation />
        </div>
        <NavLink to="/" className="title">
          <h1 className="logo">Oscars Webbshop</h1>
        </NavLink>
        <div className="buttons-container">
          <div className="cart">
            <IconButton>
              <NavLink to="/cart">
                <ShoppingCartIcon />
              </NavLink>
            </IconButton>
            <p>{cartQuantity}</p>
          </div>
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
