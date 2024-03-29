import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const MyCartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
  products: [],
  setProducts: () => {},
  cartQuantity: "",
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
  calculateTotalPrice: () => {},
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cart", []);
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);

  const calculateTotalQuantity = (productArray) => {
    let totalQuantity = 0;

    productArray.forEach((item) => {
      totalQuantity += item.quantity;
    });

    return totalQuantity;
  };

  const total = calculateTotalQuantity(cartItems);

  useEffect(() => {
    setCartQuantity(total);
  }, [cartItems]);

  function increaseQuantity(cart, productId) {
    const updatedCart = cart.map((item) => {
      if (item.product.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCartItems(updatedCart);
    return updatedCart;
  }

  function decreaseQuantity(cart, productId) {
    const updatedCart = cart.map((item) => {
      if (item.product.id === productId && item.quantity > 0) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    const filteredCart = updatedCart.filter((item) => item.quantity > 0); // Remove items with quantity 0

    setCartItems(filteredCart);
    return filteredCart;
  }

  function calculateTotalPrice(cart) {
    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice +=
        item.quantity * (item.product.default_price.unit_amount / 100);
    });

    return totalPrice;
  }

  return (
    <MyCartContext.Provider
      value={{
        setCartItems,
        cartItems,
        products,
        setProducts,
        cartQuantity,
        decreaseQuantity,
        increaseQuantity,
        calculateTotalPrice,
      }}
    >
      {children}
    </MyCartContext.Provider>
  );
};

export default CartProvider;
