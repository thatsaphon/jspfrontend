import { useContext } from 'react'
import {
  AspectRatio,
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Image,
  Input,
  Text,
  Wrap,
  Stack,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from '../config/axios'
import { CartContext } from '../contexts/CartContextProvider'

const ProductCard = ({ productId, name, description, price, imgPath }) => {
  const { register, handleSubmit } = useForm()
  const { fetchCart } = useContext(CartContext)
  const handleAddToCart = async (data) => {
    try {
      const newData = { ...data, productId }
      const res = await axios.post('/cart/user', newData)
      fetchCart()
    } catch (err) {
      console.dir(err)
    }
  }

  return (
    <div>
      <Box w="300px" rounded="20px" overflow="hidden" bg="muted.300">
        <Center w="300px" h="150px" overflow="hidden">
          <Image src={imgPath} alt="product" />
        </Center>
        <Box px={5} py={2}>
          <Flex align="baseline">
            <Badge
              variant="solid"
              bg="orangeMain.200"
              rounded="full"
              px="2"
              my={2}
            >
              Promotion
            </Badge>{' '}
            <Text ml={2} fontSize="sm">
              จำนวนในรถเข็น
            </Text>
          </Flex>
          <Box>
            <Text fontSize="sm">{name}</Text>
            <Text fontSize="sm" noOfLines={[1, 2]}>
              {description}
            </Text>
            <Text fontSize="sm">ราคา {price}.-</Text>
          </Box>
          <form onSubmit={handleSubmit(handleAddToCart)}>
            <Flex justify="flex-end">
              <NumberInput min={0} mx={2}>
                <NumberInputField {...register('quantity')} bg="muted.100" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button
                type="submit"
                fontSize="sm"
                bg="blueMain.100"
                _hover={{ boxShadow: 'md' }}
                _active={{ boxShadow: 'lg', bg: 'blueMain.200' }}
              >
                เพิ่มไปยังรถเข็น
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
      {/*<Wrap*/}
      {/*  w="150px"*/}
      {/*  h="230px"*/}
      {/*  border="1px solid black"*/}
      {/*  direction="column"*/}
      {/*  align="center"*/}
      {/*>*/}
      {/*  <Image boxSize="150px" src={'./img/Slide1.JPG'} />*/}
      {/*  <Text m="0px">Item1</Text>*/}
      {/*</Wrap>*/}
    </div>
  )
}

export default ProductCard
