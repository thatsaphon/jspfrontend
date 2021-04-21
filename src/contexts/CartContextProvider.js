import axios from '../config/axios'
import { createContext, useEffect, useState } from 'react'
import localStorageService from '../services/localStorageService'

export const CartContext = createContext()

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([])
  const fetchCart = async () => {
    try {
      if (
        localStorageService.getToken() &&
        !localStorageService.getToken().startsWith('{')
      ) {
        const res = await axios.get('/cart/user')
        setCart(res.data.cart)
      }
      if (
        !localStorageService.getToken() ||
        localStorageService.getToken().startsWith('{')
      ) {
        const res = await axios.get('/cart')
        setCart(res.data.cart)
        localStorageService.setToken(res.data.token)
      }
    } catch (err) {
      console.log(err)
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
