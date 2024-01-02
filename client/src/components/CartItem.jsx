import React from "react";
import { useContext } from "react";
import { MyCartContext } from "../context/CartContext";
import { Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { IconButton } from "@mui/material";
function CartItem() {
  const { cartItems, decreaseQuantity, increaseQuantity, calculateTotalPrice } =
    useContext(MyCartContext);

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(cartItems, productId); // Call the decreaseQuantity function from context with the cartItems and product ID
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(cartItems, productId); // Call the increaseQuantity function from context with the cartItems and product ID
  };

  const totalPrice = calculateTotalPrice(cartItems);

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
            <IconButton
              onClick={() => handleDecreaseQuantity(product.product.id)}
            >
              <RemoveCircleOutlineOutlinedIcon>
                -
              </RemoveCircleOutlineOutlinedIcon>
            </IconButton>
            <p> {product.quantity}</p>
            <IconButton
              onClick={() => handleIncreaseQuantity(product.product.id)}
            >
              <AddCircleOutlineOutlinedIcon>+</AddCircleOutlineOutlinedIcon>
            </IconButton>
          </div>
        </div>
      ))}
      <h3 className="total-price">Totalt {totalPrice} kr</h3>
    </div>
  );
}

export default CartItem;
