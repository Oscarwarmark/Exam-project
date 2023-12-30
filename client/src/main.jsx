import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CartProvider from "./context/CartContext.jsx";
import UserProvider from "./context/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <CartProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </CartProvider>
  /* </React.StrictMode> */
);
