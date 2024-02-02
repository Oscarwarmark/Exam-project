import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import SignIn from "../components/SignIn";
import "../styles/AdminPage.css";

function AdminPage() {
  const { signedInUser } = useContext(UserContext);
  return (
    <div className="admin-wrapper">
      {signedInUser.isAdmin ? (
        <div></div>
      ) : (
        <>
          <h1>Logga in</h1>
          <SignIn />
        </>
      )}
    </div>
  );
}

export default AdminPage;
