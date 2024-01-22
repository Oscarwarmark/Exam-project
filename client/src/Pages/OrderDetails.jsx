import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/OrderDetails.css";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/checkout/orderdetails/${orderId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch order with status: ${response.status}`
          );
        }

        const { order } = await response.json();
        console.log(order);
        setOrder(order);
      } catch (error) {
        console.error("Error fetching order:", error.message);
        // Handle error, show user-friendly message, etc.
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const navigateToHome = () => {
    navigate("/");
  };

  if (loading) {
    // Loading state
    return <div>Loading...</div>;
  }

  if (!order) {
    // Error state
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to load order details. Please try again later.</p>
        <button onClick={navigateToHome}>Go to Home</button>
      </div>
    );
  }

  // Render your confirmation page with the order details
  return (
    <div>
      <div className="confirmation-container">
        <div className="order-product-container">
          <div>
            <h2>Produkter</h2>
            {order.orderItems.map((product, i) => (
              <div className="order-products">
                <p>{product.quantity} st</p>
                <p>{product.productName}:</p>
                <p>{`${product.unitPrice} kr`}</p>
              </div>
            ))}
          </div>
          <Button variant="outlined" onClick={navigateToHome}>
            Fortsätt handla
          </Button>
        </div>
        <div className="order-info">
          <div id="order-thanks">
            <CheckCircleOutlineIcon fontSize="large" />
            <h1>Tack för din order {order.name}!</h1>
          </div>
          <p>Order #{order.orderNumber}</p>
          <div className="address-container">
            <h3>Address</h3>
            <p>
              <p>Namn: {order.shippingDetails.name}</p>
              stad: {order.shippingDetails.address.city},
              {order.shippingDetails.address.postalCode}
            </p>
            s{" "}
          </div>
          <div>
            <p>Order total: {order.totalOrderPrice}kr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
