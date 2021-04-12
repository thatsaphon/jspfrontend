import React from 'react'
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
  Button
} from '@chakra-ui/react'

const ProductCard = () => {
  return (
    <div>
      <Box w="300px" rounded="20px" overflow="hidden" bg="muted.300">
        <Image src={'./img/Slide1.JPG'} alt="product" />
        <Box px={5} py={2}>
          <Badge
            variant="solid"
            bg="orangeMain.200"
            rounded="full"
            px="2"
            my={2}
          >
            Promotion
          </Badge>
          <Box>
            <Text fontSize="sm">กาวดำ</Text>
            <Text fontSize="sm" noOfLines={[1, 2]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              temporibus sunt, cupiditate quod dolore minus porro ullam ex
              ratione amet unde aliquam repudiandae eos. Doloribus corrupti
              accusantium hic dolor at.
            </Text>
            <Text fontSize="sm">ราคา 150.-</Text>
          </Box>
          <Flex justify="flex-end">
            <Button
              fontSize="sm"
              bg="blueMain.100"
              _hover={{ boxShadow: 'md' }}
              _active={{ boxShadow: 'lg', bg: 'blueMain.200' }}
            >
              เพิ่มในตะกร้า
            </Button>
          </Flex>
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
