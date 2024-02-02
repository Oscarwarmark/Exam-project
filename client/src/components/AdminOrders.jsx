import React, { useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import "../styles/AdminOrders.css";
import { Button } from "@mui/material";
import SignIn from "./SignIn";

function AdminOrders() {
  const { signedInUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch orders data from the backend
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/order/orders?page=${currentPage}`);
        const data = await response.json();
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Checking if the user is an admin before fetching orders
    if (signedInUser.isAdmin) {
      fetchOrders();
    }
  }, [signedInUser, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <>
      {signedInUser.isAdmin ? (
        <div className="admin-orders">
          <ul className="orders-container">
            {orders.map((order) => (
              <li key={order._id} className="Order-items">
                <p>Order Number: {order.orderNumber}</p>
                <p>customer: {order.name}</p>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={`${order._id}-${index}`}>
                      <p>Product Name: {item.productName}</p>
                      <p>Quantity: {item.quantity}</p>
                    </li>
                  ))}
                </ul>
                {order.shippingDetails ? (
                  <div>
                    <p>
                      Shipping Address: {order.shippingDetails.address.line1},{" "}
                      {order.shippingDetails.address.city}{" "}
                      {order.shippingDetails.address.postalCode}
                    </p>
                  </div>
                ) : (
                  <p>No shipping details available for this order</p>
                )}
                <p>Total Price: {order.totalOrderPrice}</p>
                <p>order placed: {formatDate(order.updatedAt)}</p>
              </li>
            ))}
          </ul>
          <div>
            <Button
              variant="outlined"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </Button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <Button
              variant="outlined"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="admin-signin">
            <h1>Logga in</h1>
            <SignIn />
          </div>
        </>
      )}
    </>
  );
}

export default AdminOrders;
