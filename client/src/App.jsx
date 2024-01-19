import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Confirmation from "./components/confirmation";
import Cart from "./components/cart";
import OrderDetails from "./Pages/OrderDetails";
import ProductsPage from "./Pages/ProductsPage";
import ContactPage from "./Pages/ContactPage";
import AboutPage from "./Pages/AboutPage";
import SingelProductPage from "./Pages/SingelProductPage";
import AdminPage from "./Pages/AdminPage";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/confirmation/:orderId" element={<OrderDetails />} />
        <Route path="/products/:productId" element={<SingelProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
