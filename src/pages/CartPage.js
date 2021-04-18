import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Text
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../component/layout/Header'
import CartContainer from '../component/cart/CartContainer'
import { CartContext } from '../contexts/CartContextProvider'
import axios from '../config/axios'
import { useHistory } from 'react-router-dom'
import localStorageService from '../services/localStorageService'
import { ProfileContext } from '../contexts/ProfileContextProvider'
import OrderAddress from '../component/sales/OrderAddress'
import { useForm } from 'react-hook-form'
import RemoveAllFromCartButton from '../component/cart/RemoveAllFromCartButton'

function CartPage() {
  const history = useHistory()
  const { cart, setCart, fetchCart } = useContext(CartContext)
  const [isFetchAddress, setIsFetchAddress] = useState(false)
  let total = 0
  const handleConfirmOrder = async (data) => {
    if (!profile.id) {
      const cartItemId = cart.map((item, index) => item.id)
      const newData = { ...data, cartItemId }
      const res = await axios.post('/order/guest', newData)
      console.log(res.data.orderId)
      localStorageService.clearToken()
      setCart([])
      history.push('/order/' + res.data.orderId)
    } else {
      const res = await axios.post('/order', data)
      fetchCart()
      history.push('/order/' + res.data.orderId)
    }
  }
  const { profile, fetchProfile } = useContext(ProfileContext)
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (profile.firstName) setIsFetchAddress(true)
  }, [profile.firstName])

  const handleRemoveAllFromCart = async () => {
    await axios.delete('/cart/user')
    fetchCart()
  }

  return (
    <Box>
      <Header />
      <Center>
        <Box w="750px" m="2">
          <Heading mx="10px" my="10px">
            ตะกร้าสินค้า
          </Heading>
          <Container
            border="1px solid black"
            maxW="container.md"
            mx="0"
            p="3"
            borderRadius="xl"
          >
            {cart.map((item, index) => {
              total += item.Product.price * item.quantity

              return (
                <CartContainer
                  key={item.id}
                  cartItemId={item.id}
                  product={item.Product.name}
                  description={item.Product.description}
                  price={item.Product.price}
                  quantity={item.quantity}
                  productId={item.productId}
                  imgPath={item.Product.imgPath}
                  profile={profile}
                />
              )
            })}
            <form onSubmit={handleSubmit(handleConfirmOrder)}>
              <Flex mt={3}>
                {isFetchAddress && (
                  <OrderAddress profile={profile} register={register} />
                )}
                {!isFetchAddress && (
                  <OrderAddress profile={profile} register={register} />
                )}
                <Spacer />
                <Box>
                  <Text textAlign="end">ยอดรวมทั้งหมด </Text>
                  <Text fontWeight="semibold" textAlign="end" my={1}>
                    &#3647; {total}
                  </Text>
                  <Button
                    type="submit"
                    size="sm"
                    border="1px solid"
                    borderColor="orangeMain.200"
                    bg="orangeMain.100"
                    _hover={{ bg: 'orangeMain.200', boxShadow: 'lg' }}
                    // onClick={handleConfirmOrder}
                  >
                    สั่งซื้อสินค้าในรถเข็น
                  </Button>
                </Box>
              </Flex>
            </form>
          </Container>
          <Flex direction="row-reverse" mt={3}>
            <RemoveAllFromCartButton fetchCart={fetchCart} axios={axios} />
          </Flex>
        </Box>
      </Center>
    </Box>
  )
}

export default CartPage
