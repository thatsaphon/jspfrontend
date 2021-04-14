import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, Container, Flex, Spacer, Text, Wrap } from '@chakra-ui/layout'
import React from 'react'
import Header from '../component/layout/Header'

function SingleProductPage() {
  return (
    <Box>
      <Header />

      <Wrap justify="center">
        <Wrap bg="muted.200" p={3} rounded="20px">
          <Image maxW="400px" src={'/img/Slide1.JPG'} alt="product" />
          <Spacer />
          <Flex maxW="500px" pl={10} direction="column">
            <Text as="h2" fontWeight="semibold" mt={2}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
            <Container bg="muted.300" p={2} m={1}>
              <Text color="red" fontSize="2xl">
                &#3647; 150.-
              </Text>
            </Container>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
              officiis nam dolorum.
            </Text>
            <Text>รุ่น : Lorem, ipsum.</Text>

            <Box mt={4}>
              <Button
                bg="blueMain.100"
                _hover={{ boxShadow: 'md' }}
                _active={{ boxShadow: 'lg', bg: 'blueMain.200' }}
              >
                เพิ่มไปยังรถเข็น
              </Button>
            </Box>
            <Spacer />
            {/* <Flex align="flex-end">
              <Text>ราคา 150.-</Text>
              <Spacer />
              <Flex>
                <Button
                  bg="blueMain.100"
                  _hover={{ boxShadow: 'md' }}
                  _active={{ boxShadow: 'lg', bg: 'blueMain.200' }}
                >
                  เพิ่มไปยังรถเข็น
                </Button>
              </Flex>
            </Flex> */}
          </Flex>
        </Wrap>
      </Wrap>
    </Box>
  )
}

export default SingleProductPage
