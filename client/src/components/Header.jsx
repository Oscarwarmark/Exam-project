import { NavLink } from "react-router-dom";
import "../Styles/Header.css";
import SignIn from "./SignIn";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { MyCartContext } from "../context/CartContext";

const Header = () => {
  const { cartItems, cartQuantity } = useContext(MyCartContext);

  return (
    <div className="header-container">
      <NavLink to="/" className="title">
        <h1>Oscars Webbshop</h1>
      </NavLink>
      <div className="buttons-container">
        <SignIn />
        <div className="cart">
          <NavLink to="/cart">
            <Button variant="outlined">cart</Button>
          </NavLink>
          <p>{cartQuantity}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
