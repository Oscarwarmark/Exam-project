import React, { useState, useEffect, useContext } from "react";
import { MyCartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import "../styles/SingelProductPage.css";
import { Button } from "@mui/material";
import ProductCard from "../components/ProductCard";
function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const { cartItems, setCartItems } = useContext(MyCartContext);

  useEffect(() => {
    // Fetch the product by ID from your backend
    fetch(`/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

  const handleClick = (product) => {
    // Check if the product is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      // If it exists, update the quantity
      const updatedCartItems = cartItems.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCartItems(updatedCartItems);
    } else {
      // If it doesn't exist, add a new entry with quantity 1
      setCartItems([...cartItems, { product: product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <div></div>
      {product ? (
        <div className="SingelProductPage">
          <div className="Singel-product-container">
            <div className="Singel-Product-info">
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
              </div>
              <p>(image size 50 x 30cm)</p>
              <div className="price-add-to-cart-btn">
                <p> {product.default_price.unit_amount / 100}kr</p>

                <Button variant="outlined" onClick={() => handleClick(product)}>
                  lägg till i kundvagn
                </Button>
              </div>
            </div>
            <img
              className="Singel-Product-img"
              src={`${product.images}`}
              alt=""
            />
          </div>
          <div className="similar-products">
            <h1>Liknande produkter</h1>
            <ProductCard />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleProductPage;
