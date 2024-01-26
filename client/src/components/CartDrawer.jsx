import { Drawer, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MyCartContext } from "../context/CartContext";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
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
          <div className="cart-title">
            <h1>Kundvagn</h1>
            <div className="cart-close-btn">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => setIsDrawerOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div>
            <CartItem />
          </div>

          <div className="checkout-btn">
            <NavLink to="/cart">
              <Button
                variant="outlined"
                style={{ borderColor: "black", color: "black" }}
                onClick={() => setIsDrawerOpen(false)}
              >
                Gå till kassan
              </Button>
            </NavLink>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default CartDrawer;
