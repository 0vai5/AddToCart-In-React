import React, { useEffect, useState } from 'react'
import CartContext from './context'

const CartContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id)
    if (isItemInCart) {
      setCartItems(
          cartItems.map((cartItem) => 
          cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem 
          )
      );
      } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]); 
      }
  }

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id)

    if(isItemInCart.quantity === 1){
      setCartItems(cartItems.filter((cartItem)=> cartItem.id !== item.id));
    }else{
      setCartItems(
        cartItems.map((cartItem) => 
        cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ))
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider value={{cartItems, setCartItems, addToCart, getCartTotal, removeFromCart, clearCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider