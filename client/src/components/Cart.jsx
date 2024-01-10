import Header from "./Header";
import SignIn from "./SignIn";
import RegisterForm from "./RegisterForm";
import "../Styles/Cart.css";
import { MyCartContext } from "../context/CartContext";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems } = useContext(MyCartContext);
  const { isLoggedIn } = useContext(UserContext);

  const cart = cartItems.map((item) => ({
    product: item.product.default_price.id,
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

    const responseData = await response.json(); // Consume the response body once
    console.log(responseData); // Log the entire response data if needed
    const { url } = responseData; // Extract URL from response data
    window.location = url; // Redirect to the URL
  }

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h2>Varor i kundvagn</h2>
        <CartItem />

        {isLoggedIn ? (
          <div>
            <SignIn />
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
