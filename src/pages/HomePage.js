import { Box } from '@chakra-ui/react'
import Header from '../component/layout/Header'
import Logo from '../component/layout/Logo'
import ProductContainer from '../component/layout/ProductContainer'
import TextContent from '../component/layout/TextContent'

function HomePage() {
  return (
    <Box>
      <Header />
      <Logo />
      <TextContent />
      {/* <ProductContainer /> */}
    </Box>
  )
}

export default HomePage
