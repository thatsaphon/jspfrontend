import { useContext, useState } from 'react'
import {
  Badge,
  Box,
  Center,
  Flex,
  Image,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from '../config/axios'
import { CartContext } from '../contexts/CartContextProvider'
import { ProfileContext } from '../contexts/ProfileContextProvider'
import ProductPictureSlider from './product/ProductPictureSlider'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { GiCircle } from 'react-icons/gi'
import { BsCircleFill } from 'react-icons/bs'

const ProductCard = ({
  productId,
  name,
  description,
  price,
  imgPath,
  cartQuantity,
  ProductImages
}) => {
  const { register, handleSubmit } = useForm()
  const { fetchCart, cart, setCart } = useContext(CartContext)
  const { profile } = useContext(ProfileContext)
  const [selectedImg, setSelectedImg] = useState(0)
  const handleAddToCart = async (data) => {
    try {
      if (!profile.id) {
        const newData = { ...data, productId, unitPrice: price }
        console.log(newData)
        const res = await axios.post('/cart', newData)
        // localStorageService.setToken(res.data.token)
        setCart(res.data.cart)
      } else {
        const newData = { ...data, productId }
        await axios.post('/cart/user', newData)
        fetchCart()
      }
    } catch (err) {
      console.dir(err)
    }
  }

  const handleNextSlider = () => {
    if (selectedImg === ProductImages.length - 1) setSelectedImg(0)
    else setSelectedImg(selectedImg + 1)
  }
  const handleBackSlider = () => {
    if (selectedImg === 0) setSelectedImg(ProductImages.length - 1)
    else setSelectedImg(selectedImg - 1)
  }

  return (
    <div>
      <Box w="300px" rounded="20px" overflow="hidden" bg="muted.300">
        <Center w="300px" h="150px" overflow="hidden" position="relative">
          <Box>
            <ProductPictureSlider
              imgPath={
                ProductImages &&
                ProductImages[selectedImg] &&
                ProductImages[selectedImg].imgPath
              }
            />
            <Box
              position="absolute"
              top="50%"
              left="0"
              bg="gray.200"
              opacity="50%"
              pl={1}
              pr={3}
              _hover={{ cursor: 'pointer', bg: 'gray.300', opacity: '100%' }}
              // onClick={() => setSelectedImg(selectedImg - 1)}
              onClick={handleBackSlider}
            >
              <ArrowLeftIcon />
            </Box>
            <Box
              position="absolute"
              top="50%"
              right="0"
              bg="gray.200"
              opacity="50%"
              pl={3}
              pr={1}
              _hover={{ cursor: 'pointer', bg: 'gray.300', opacity: '100%' }}
              // onClick={() => setSelectedImg(selectedImg + 1)}
              onClick={handleNextSlider}
            >
              <ArrowRightIcon />
            </Box>
          </Box>
          {/* <Image src={imgPath} alt="product" /> */}
        </Center>
        <Box px={5} py={2}>
          <Flex justify="center">
            {ProductImages.map((image, index) =>
              selectedImg === index ? (
                <Icon as={BsCircleFill} key={index} mx={0.5} />
              ) : (
                <Icon
                  as={GiCircle}
                  key={index}
                  mx={0.5}
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => setSelectedImg(index)}
                />
              )
            )}
          </Flex>
          <Flex align="baseline">
            <Badge
              variant="solid"
              bg="orangeMain.200"
              rounded="full"
              px="2"
              my={2}
              fontWeight="normal"
            >
              {/* Promotion */}
              จำนวนในรถเข็น {cartQuantity}
            </Badge>
            {/* <Text ml={2} fontSize="sm">
              จำนวนในรถเข็น {cartQuantity}
            </Text> */}
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
