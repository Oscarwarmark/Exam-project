import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Confirmation from "./components/Confirmation";
import Cart from "./components/Cart";
import OrderDetails from "./Pages/OrderDetails";
import ProductsPage from "./Pages/ProductsPage";
import ContactPage from "./Pages/ContactPage";
import AboutPage from "./Pages/AboutPage";
import SingelProductPage from "./Pages/SingelProductPage";
import AdminPage from "./Pages/AdminPage";
import Header from "./components/Header";
import "./styles/App.css";
import Footer from "./components/Footer";
import AdminOrders from "./components/AdminOrders";
import AdminProducts from "./components/AdminProducts";

function App() {
  return (
    <BrowserRouter>
      <Header />
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
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
