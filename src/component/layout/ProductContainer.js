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
} from "@chakra-ui/react"

function ProductContainer() {
  return (
    <Center>
      <Box w="750px" m="2">
        <Heading mx="10px" my="10px">
          รายการสินค้า
        </Heading>
        <Container
          border="1px solid black"
          maxW="container.md"
          mx="0"
          p="3"
          borderRadius="xl"
        >
          <Flex align="center" m="1">
            <AspectRatio minW="50px" w="150px" ratio={1}>
              <Image boxSize="100px"></Image>
            </AspectRatio>
            <Text mx="2">Item1 Lorem, ipsum dolor.</Text>
            <Spacer />
            <Flex direction="column" align="center">
              <Text mb="2">150.-</Text>
              <Input size="xs" width="30px" />
              <Flex mt="2">
                <Text mx="1">- </Text> <Text mx="1"> +</Text>
              </Flex>
              <Text>Add to Cart</Text>
            </Flex>
          </Flex>
          <Flex direction="row-reverse">ดูสินค้าทั้งหมด</Flex>
        </Container>
      </Box>
    </Center>
  )
}
export default ProductContainer
