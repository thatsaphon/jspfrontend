import {
  Center,
  Box,
  Image,
  Container,
  Flex,
  Spacer,
  Text,
  Grid,
  GridItem,
  AspectRatio,
  Heading,
  Wrap,
  Avatar,
} from "@chakra-ui/react"
import Header from "../component/layout/Header"
import Logo from "../component/layout/Logo"
import ProductContainer from "../component/layout/ProductContainer"
import TextContent from "../component/layout/TextContent"

function HomePage() {
  return (
    <Box p={[2, 3]}>
      <Header />
      <Logo />
      <TextContent />
      <ProductContainer />
    </Box>
  )
}

export default HomePage
