import Header from '../component/layout/Header'
import ProductContainer from '../component/layout/ProductContainer'
import ProductCard from '../component/ProductCard'
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Wrap
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from '../config/axios'
// import axios from 'axios'

function ProductPage() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get('/product')
      setProducts(res.data.products)
    }
    fetchProduct()
  }, [])
  return (
    <Box bg="gray.50">
      <Header />
      {/*<ProductContainer />*/}
      <Container maxW={'container.md'}>
        <Heading mb={5}>รายการสินค้า</Heading>
        <Container maxW={'container.md'}>
          <Flex gridGap={5} gridColumnGap={10} justify="center" wrap="wrap">
            {products.map((item, index) => (
              <ProductCard
                key={item.id}
                productId={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imgPath={item.imgPath}
              />
            ))}
          </Flex>
        </Container>
      </Container>
    </Box>
  )
}
export default ProductPage
