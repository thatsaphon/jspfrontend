import {
  Center,
  Heading,
  Container,
  AspectRatio,
  Image,
  Text,
  Spacer,
  Flex,
  Box,
  Input,
  Wrap,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Button,
  Divider
} from '@chakra-ui/react'
import axios from '../../config/axios'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContextProvider'

function ProductContainer({
  cartItemId,
  product,
  description,
  quantity,
  price,
  productId,
  imgPath
}) {
  const { register, handleSubmit } = useForm()
  const { fetchCart } = useContext(CartContext)
  const updateCart = async (data) => {
    const newData = { ...data, productId }
    const res = await axios.post('/cart/user', newData)
    fetchCart()
  }

  return (
    <Flex
      align="center"
      m="1"
      borderBottom="1px solid"
      borderColor="gray.200"
      pb={1}
    >
      <AspectRatio minW="50px" w="150px" ratio={1}>
        <Image src={imgPath} boxSize="100px"></Image>
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

      <Flex direction="column" align="center">
        <Text mb="2">{price * quantity}.-</Text>
        <form onSubmit={handleSubmit(updateCart)}>
          <NumberInput min={0} mx={2} defaultValue={quantity} maxW="80px">
            <NumberInputField {...register('quantity')} bg="muted.100" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button type="submit" size="sm" mt={2}>
            อัพเดท
          </Button>
        </form>
      </Flex>
    </Flex>
  )
}
export default ProductContainer
