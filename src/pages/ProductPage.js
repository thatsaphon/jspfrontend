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

function ProductPage() {
  return (
    <Box bg="gray.50">
      <Header />
      {/*<ProductContainer />*/}
      <Container maxW={'container.md'}>
        <Heading mb={5}>รายการสินค้า</Heading>
        <Container maxW={'container.md'}>
          <Flex gridGap={5} gridColumnGap={10} justify="center" wrap="wrap">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Flex>
        </Container>
      </Container>
    </Box>
  )
}
export default ProductPage
