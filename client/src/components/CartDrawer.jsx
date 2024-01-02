import { Drawer, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MyCartContext } from "../context/CartContext";
import Button from "@mui/material/Button";
import "../styles/CartDrawer.css";

function CartDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cartItems, cartQuantity } = useContext(MyCartContext);

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
            <div className="">
              {cartItems.map((product, i) => (
                <div key={i} className="cart-drawer-productcard">
                  <img src={`${product.product.images}`} alt="" />
                  <div className="cart-productcard-info">
                    <h4>{product.product.name}</h4>
                    <p>{`${
                      product.product.default_price.unit_amount / 100
                    } kr`}</p>
                  </div>
                  <p className="cart-amount">Antal: {product.quantity}</p>
                </div>
              ))}
            </div>
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
