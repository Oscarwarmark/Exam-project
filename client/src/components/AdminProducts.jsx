import React, { useState } from "react";
import "../styles/AdminProducts.css";

function AdminProducts() {
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
    <div className="admin-products">
      <h1>Create a New Product</h1>
      <form>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product Description:
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product Price:
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateProduct}>
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AdminProducts;
