import Header from "../components/Header";
import "../Styles/home.css";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { MyCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Home = () => {
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
    <>
      <>
        <div className="container">
          <h1>Spana in mina bilder</h1>
          <Link to={`/Products/`}>
            <Button
              style={{ borderColor: "black", color: "black", width: "150px" }}
              variant="outlined"
            >
              Products
            </Button>
          </Link>
        </div>

        <div className="blank"></div>

        <div className="container second">
          {products.map((product, i) => (
            <Link key={i} to={`/Products/${product.id}`}>
              <div className="item">
                <img className="home-imges" src={`${product.images}`} alt="" />
              </div>
            </Link>
          ))}
        </div>
      </>
    </>
  );
};

export default Home;
