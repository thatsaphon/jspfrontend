import Header from '../component/layout/Header'
import ProductCard from '../component/ProductCard'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import axios from '../config/axios'
import { CartContext } from '../contexts/CartContextProvider'

function ProductPage() {
  const { cart } = useContext(CartContext)

  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get('/product')
        setProducts(res.data.products)
      } catch (err) {
        console.dir(err)
      }
    }
    fetchProduct()
  }, [])
  const productQuantity = products.map((product, index) => {
    for (let i = 0; i <= cart.length; i++) {
      if (i === cart.length) return { ...product, cartQuantity: 0 }
      if (product.id === cart[i].productId)
        return { ...product, cartQuantity: cart[i].quantity }
    }
  })
  console.log(cart)
  console.log(productQuantity)
  return (
    <Box bg="gray.50">
      <Header />
      {/*<ProductContainer />*/}
      <Container maxW={'container.md'}>
        <Heading mb={5}>รายการสินค้า</Heading>
        <Container maxW={'container.md'}>
          <Flex gridGap={5} gridColumnGap={10} justify="center" wrap="wrap">
            {productQuantity.map((item, index) => (
              <ProductCard
                key={item.id}
                productId={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imgPath={item.imgPath}
                cartQuantity={+item.cartQuantity}
                ProductImages={item.ProductImages}
              />
            ))}
          </Flex>
        </Container>
      </Container>
    </Box>
  )
}
export default ProductPage
