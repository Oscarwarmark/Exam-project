import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SingelProductPage.css";
function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product by ID from your backend
    console.log(product);
    fetch(`/api/getProducts/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

  return (
    <div>
      <div>
        <Header />
      </div>
      {product ? (
        <div className="SingelProductPage">
          <div className="Singel-Product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.default_price.unit_amount / 100}kr</p>
          </div>
          <img
            className="Singel-Product-img"
            src={`${product.images}`}
            alt=""
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );
}

export default SingleProductPage;
