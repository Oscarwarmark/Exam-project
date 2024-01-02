import React from "react";
import { useContext } from "react";
import { MyCartContext } from "../context/CartContext";
import { Button } from "@mui/material";

function CartItem() {
  const { cartItems, decreaseQuantity, increaseQuantity } =
    useContext(MyCartContext);

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(cartItems, productId); // Call the decreaseQuantity function from context with the cartItems and product ID
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(cartItems, productId); // Call the increaseQuantity function from context with the cartItems and product ID
  };

  return (
    <div className="">
      {cartItems.map((product, i) => (
        <div key={i} className="cart-drawer-productcard">
          <img src={`${product.product.images}`} alt="" />
          <div className="cart-productcard-info">
            <h4>{product.product.name}</h4>
            <p>{`${product.product.default_price.unit_amount / 100} kr`}</p>
          </div>
          <div className="cart-amount">
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleDecreaseQuantity(product.product.id)}
            >
              -
            </Button>
            <p> {product.quantity}</p>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleIncreaseQuantity(product.product.id)}
            >
              +
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItem;
