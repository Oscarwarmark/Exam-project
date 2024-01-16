import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/OrderDetails.css";
import Header from "../components/Header";
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
      <Header />
      <div className="confirmation-container">
        <h1>Thank you for your order!</h1>
        <h2>Order Confirmation</h2>
        <p>Order Number: {order.orderNumber}</p>
        <h2>Products</h2>
        <div>
          {order.orderItems.map((product, i) => (
            <div className="order-products">
              <p>{product.quantity} st</p>
              <p>{product.productName}:</p>
              <p>{`${product.unitPrice} kr`}</p>
            </div>
          ))}
        </div>

        <p>Order total: {order.totalOrderPrice}kr</p>
        {/* Display other order details as needed */}
        <button onClick={navigateToHome}>Go to Home</button>
      </div>
    </div>
  );
};

export default OrderDetails;
