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
        <div className="cart-drawer-container">
          {cartItems.map((product, i) => (
            <div key={i} className="cart-drawer-productcard">
              <img src={`${product.product.images}`} alt="" />
              <div className="cart-productcard-info">
                <h4>{product.product.name}</h4>
                <p>{`${product.product.default_price.unit_amount / 100} kr`}</p>
              </div>
              <p className="cart-amount">Antal: {product.quantity}</p>
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
