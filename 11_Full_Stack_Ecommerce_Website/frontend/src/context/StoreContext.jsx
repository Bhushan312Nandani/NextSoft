import { createContext, useState, useEffect } from 'react';
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exist = cart.find(x => x._id === product._id);
    if (exist) {
      setCart(cart.map(x => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(x => x._id !== id));
  };

  return (
    <StoreContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </StoreContext.Provider>
  );
};
