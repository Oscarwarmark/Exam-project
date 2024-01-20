import React from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminOrders from "../components/AdminOrders";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import SignIn from "../components/SignIn";
import "../styles/AdminPage.css";

function AdminPage() {
  const { signedInUser } = useContext(UserContext);
  return (
    <>
      {signedInUser.isAdmin ? (
        <div className="admin-layout">
          <AdminNavigation />

          <div>
            <AdminOrders />
          </div>
        </div>
      ) : (
        <>
          <h1>Sign in</h1>
          <SignIn />
        </>
      )}
    </>
  );
}

export default AdminPage;
