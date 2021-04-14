import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from '../component/layout/Header'
import CartContainer from '../component/layout/CartContainer'

function CartPage() {
  return (
    <Box>
      <Header />
      <CartContainer />
    </Box>
  )
}

export default CartPage
