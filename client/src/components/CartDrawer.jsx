import { Drawer, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MyCartContext } from "../context/CartContext";
import Button from "@mui/material/Button";
import "../styles/CartDrawer.css";
import CartItem from "./CartItem";

function CartDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cartQuantity } = useContext(MyCartContext);
  return (
    <>
      <div className="cart">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => setIsDrawerOpen(true)}
        >
          <ShoppingCartIcon />
        </IconButton>
        <p>{cartQuantity}</p>
      </div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="mobile-navigation-container">
          <h1 className="cart-title">Kundvagn</h1>
          <div>
            <CartItem />
          </div>
          <NavLink to="/cart">
            <Button variant="outlined">Till kassan</Button>
          </NavLink>
        </div>
      </Drawer>
    </>
  );
}

export default CartDrawer;
