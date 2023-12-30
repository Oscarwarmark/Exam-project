import Header from "./Header";
import SignIn from "./SignIn";
import RegisterForm from "./RegisterForm";
import "../Styles/Cart.css";
import { MyCartContext } from "../context/CartContext";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";

const Cart = () => {
  const { cartItems } = useContext(MyCartContext);
  const { isLoggedIn } = useContext(UserContext);

  const cart = cartItems.map((item) => ({
    product: item.product.default_price,
    quantity: item.quantity,
  }));

  async function HandelPayment() {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      return;
    }

    const { url } = await response.json();
    window.location = url;
  }

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h2>Varor i kundvagn</h2>
        <div className="products-container">
          {cartItems.map((product, i) => (
            <div key={i} className="cart-product-card">
              <img src={`${product.product.images}`} alt="" />
              <h1>{product.product.name}</h1>
              <p>Antal: {product.quantity}</p>
            </div>
          ))}
        </div>
        {isLoggedIn ? (
          <div>
            <Button variant="outlined" onClick={HandelPayment}>
              Gå till betalning
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <p>Du måste vara inloggad för att handla</p>
              <SignIn />
            </div>
            <div>
              <RegisterForm />
            </div>
            <Button variant="outlined" disabled>
              Gå till betalning
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
