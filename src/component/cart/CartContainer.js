import {
  AspectRatio,
  Image,
  Text,
  Spacer,
  Flex,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Button
} from '@chakra-ui/react'
import axios from '../../config/axios'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../contexts/CartContextProvider'
import RemoveFromCartAlert from './RemoveFromCartAlert'

function ProductContainer({
  cartItemId,
  product,
  description,
  quantity,
  price,
  productId,
  imgPath
}) {
  const { register, handleSubmit, watch } = useForm()
  const { fetchCart } = useContext(CartContext)
  const updateCart = async (data) => {
    try {
      const newData = { ...data, productId }
      console.log(newData)
      if (data.quantity !== '0') await axios.post('/cart/user', newData)
      // if (data.quantity === '0') await axios.put('/cart/user', newData)
      fetchCart()
    } catch (err) {
      console.log(err)
    }
  }
  console.log(watch())
  console.log(productId)
  // useEffect(() => {}, [watch().quantity])

  return (
    <Flex
      align="center"
      m="1"
      borderBottom="1px solid"
      borderColor="gray.200"
      pb={1}
    >
      <AspectRatio minW="142px" w="150px" ratio={1}>
        <Image src={imgPath} boxSize="90px"></Image>
      </AspectRatio>
      <Flex mx="2" align="baseline" direction="column">
        <Text as="h2" fontWeight="semibold">
          {product}
        </Text>
        <Text fontSize="sm">{description}</Text>
        <Text fontSize="sm" color="red">
          &#3647; {+price}
        </Text>
      </Flex>
      <Spacer />

      <form onSubmit={handleSubmit(updateCart)}>
        <Flex direction="column" align="flex-end">
          <Text mb="2" textAlign="end">
            {price * quantity}.-
          </Text>
          <NumberInput min={0} mx={2} defaultValue={quantity} w="80px">
            <NumberInputField {...register('quantity')} bg="muted.100" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {watch().quantity !== '0' && (
            <Button type="submit" size="sm" mt={2}>
              อัพเดท
            </Button>
          )}
          {watch().quantity == '0' && (
            // <Button type="submit" size="sm" mt={2} size="xs">
            //   นำออกจากรถเข็น
            // </Button>
            <RemoveFromCartAlert
              fetchCart={fetchCart}
              handleSubmit={handleSubmit}
              productId={productId}
            />
          )}
        </Flex>
      </form>
    </Flex>
  )
}
export default ProductContainer
