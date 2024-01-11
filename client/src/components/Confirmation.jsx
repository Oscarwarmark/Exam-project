import { useState, useContext, useEffect } from "react";
import Header from "./Header";
import { MyCartContext } from "../context/CartContext";

function Confirmation() {
  const { setCartItems } = useContext(MyCartContext);
  const [isPaymentVerifyed, setIsPaymentVerifyed] = useState();

  const verifyPayment = async () => {
    const sessionId = sessionStorage.getItem("stripe-session-id");

    const response = await fetch("/api/checkout/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    const { verifyed } = await response.json();

    if (verifyed) {
      setIsPaymentVerifyed(true);
      sessionStorage.removeItem("stripe-session-id");
      setCartItems([]);
    } else {
      setIsPaymentVerifyed(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div>
      <Header />
      <div>Tack för ditt köp</div>
    </div>
  );
}

export default Confirmation;
