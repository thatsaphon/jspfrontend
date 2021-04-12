import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import {
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Text,
  Wrap
} from '@chakra-ui/layout'
import React from 'react'
import Header from '../component/layout/Header'

function LogInPage() {
  return (
    <Box>
      <Header />
      <Wrap justify="center" m={8}>
        <Box
          w="400px"
          p={8}
          //   border="solid"
          d="flex"
          justfiy="center"
          flexDirection="column"
          bg="orange.100"
          rounded="20px"
        >
          <Text
            as="h2"
            fontWeight="semibold"
            fontSize="lg"
            color="blueMain.200"
            mb={3}
          >
            Log-in
          </Text>
          <Input placeholder="username" size="sm" bg="muted.100" mb={2} />
          <Input placeholder="password" size="sm" bg="muted.100" mb={2} />
          <Flex align="center" direction="column">
            <Button bg="blueMain.100" mt={3}>
              Log in
            </Button>
            <Text as="u">forget-password</Text>
            <Center w="300px" borderBottom="1px solid gray" mt="3"></Center>
            <Text as="u">register</Text>
          </Flex>
        </Box>
      </Wrap>
    </Box>
  )
}
export default LogInPage
