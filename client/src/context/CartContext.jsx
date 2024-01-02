import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const MyCartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
  products: [],
  setProducts: () => {},
  cartQuantity: "",
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);

  const calculateTotalQuantity = (productArray) => {
    let totalQuantity = 0;

    // Iterate through the array and sum up the quantities
    productArray.forEach((item) => {
      totalQuantity += item.quantity;
    });

    return totalQuantity;
  };

  // Calculate the total quantity
  const total = calculateTotalQuantity(cartItems);

  useEffect(() => {
    setCartQuantity(total);
    console.log(cartItems);
  }, [cartItems]);

  return (
    <MyCartContext.Provider
      value={{
        setCartItems,
        cartItems,
        products,
        setProducts,
        cartQuantity,
      }}
    >
      {children}
    </MyCartContext.Provider>
  );
};

export default CartProvider;
