import { useEffect, useContext } from "react";
import { MyCartContext } from "../context/CartContext";
import Button from "@mui/material/Button";
import "../styles/ProductCard.css";
import { Link } from "react-router-dom";
const ProductCard = () => {
  const { products, setProducts } = useContext(MyCartContext);

  useEffect(() => {
    async function ListOfProducts() {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch products");
        }

        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error retrieving products:", error);
      }
    }

    ListOfProducts();
  }, []);

  return (
    <div>
      <div className="products-container">
        <div className="main-container">
          {products.map((product, i) => (
            <div key={i} className="product-card">
              <Link to={`/Products/${product.id}`}>
                <img src={`${product.images}`} alt="" />
                <h1>{product.name}</h1>
                <p>{`${product.default_price.unit_amount / 100} kr`}</p>
              </Link>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductCard;
