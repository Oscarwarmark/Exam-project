import React from "react";
import "../styles/AdminNavigation.css";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
function AdminNavigation() {
  const { signedInUser } = useContext(UserContext);
  return (
    <aside className="Admin-navigation">
      <h1 className="admin-name">{signedInUser.name}</h1>
      <ul className="admin-navigation-list">
        <li>orders</li>
        <li>products</li>
        <li>users</li>
        <li>sdfs</li>
        <li>sgfsd</li>
      </ul>
    </aside>
  );
}

export default AdminNavigation;
