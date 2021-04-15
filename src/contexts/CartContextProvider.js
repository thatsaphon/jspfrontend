import axios from '../config/axios'
import { createContext, useEffect, useState } from 'react'
import localStorageService from '../services/localStorageService'

export const CartContext = createContext()

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([])
  const fetchCart = async () => {
    if (localStorageService.getToken()) {
      const res = await axios.get('/cart/user')
      setCart(res.data.cart)
    }
  }
  useEffect(() => {
    fetchCart()
  }, [])
  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
