import React, { useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import "../styles/AdminOrders.css";

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
        console.log(data);
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Check if the user is an admin before fetching orders
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

  // Function to format date to dd/mm/yy
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
      <div className="admin-orders">
        <h1>AdminPage</h1>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order Number: {order.orderNumber}</p>
              <p>customer: {order.name}</p>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item._id}>
                    <p>Product Name: {item.productName}</p>
                    <p>Quantity: {item.quantity}</p>
                  </li>
                ))}
              </ul>
              <p>Total Price: {order.totalOrderPrice}</p>
              <p>order placed: {formatDate(order.updatedAt)}</p>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
