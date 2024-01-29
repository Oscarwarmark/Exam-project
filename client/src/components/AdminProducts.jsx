import React, { useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import "../styles/AdminProducts.css";
import { Button, TextField } from "@mui/material";
import SignIn from "./SignIn";

function AdminProducts() {
  const { signedInUser } = useContext(UserContext);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleCreateProduct = async () => {
    try {
      const response = await fetch("/api/products/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          imageUrl: productImage,
        }),
      });

      const { productId } = await response.json();

      console.log("Product created with ID:", productId);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      {signedInUser.isAdmin ? (
        <div className="admin-products">
          <h1>Create a New Product</h1>
          <form className="new-product-form">
            <label>
              Product Name:
              <TextField
                variant="outlined"
                label="Name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Product Description:
              <TextField
                label="Description"
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Product Price:
              <TextField
                label="123"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </label>
            <br />
            <label>
              Image URL:
              <TextField
                label="Image URL:"
                type="text"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
              />
            </label>
            <br />
            <Button
              variant="outlined"
              type="button"
              onClick={handleCreateProduct}
            >
              Create Product
            </Button>
          </form>
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

export default AdminProducts;
