import { useState, useContext, useEffect } from "react";
import { MyCartContext } from "../context/CartContext";
import { CircularProgress } from "@mui/material";

const CLIENT_URL = "http://localhost:5173";

// handeling and verifying the order before sending the customer to the order confirmation page
function Confirmation() {
  const { setCartItems } = useContext(MyCartContext);
  const [isPaymentVerified, setIsPaymentVerified] = useState();

  const verifyPayment = async () => {
    const sessionId = sessionStorage.getItem("stripe-session-id");

    const response = await fetch("/api/checkout/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    const { verified, orderId } = await response.json();
    console.log(response);

    if (verified) {
      setIsPaymentVerified(true);
      sessionStorage.removeItem("stripe-session-id");
      setCartItems([]);
      window.location.href = `${CLIENT_URL}/confirmation/${orderId}`;
    } else {
      setIsPaymentVerified(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="handle-order">
      <h1>Hanterar order</h1>
      <CircularProgress />
    </div>
  );
}

export default Confirmation;
