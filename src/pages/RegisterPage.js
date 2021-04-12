import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, Wrap, Text, Flex, Center } from '@chakra-ui/layout'
import Header from '../component/layout/Header'
import { Button } from '@chakra-ui/button'
import { useState } from 'react'
// import { Button, Input, Box, Wrap, Text, Flex } from '@chakra-ui/react'

function RegisterPage() {
  const [show, setShow] = useState(false)
  return (
    <Box>
      <Header />
      <Wrap justify="center" m={8}>
        <Box
          w="400px"
          p={8}
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
            Register
          </Text>

          <Input
            placeholder="ชื่อผู้ใช้"
            type="text"
            size="sm"
            bg="muted.100"
            mb={2}
          />
          <InputGroup size="md">
            <Input
              placeholder="รหัสผ่าน"
              // type="password"
              type={show ? 'text' : 'password'}
              pr="4.5rem"
              size="sm"
              bg="muted.100"
              mb={2}
            />
            <InputRightElement w="4.5rem" h="32px">
              <Button
                size="xs"
                h="20px"
                colorScheme="blue"
                onClick={() => setShow(!show)}
                boxSizing="border-box"
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Input
            placeholder="ชื่อจริง"
            type="text"
            size="sm"
            bg="muted.100"
            mb={2}
          />
          <Input
            placeholder="นามสกุล"
            type="text"
            size="sm"
            bg="muted.100"
            mb={2}
          />
          <Input
            placeholder="เบอร์โทรศัพท์"
            type="text"
            size="sm"
            bg="muted.100"
            mb={2}
          />
          <Input
            placeholder="อีเมล"
            type="text"
            size="sm"
            bg="muted.100"
            mb={2}
          />
          <Input
            placeholder="รูป"
            type="picture"
            size="sm"
            bg="muted.100"
            mb={2}
          />
          <Flex align="center" direction="column">
            <Button bg="blueMain.100" mt={3}>
              สมัครสมาชิก
            </Button>
          </Flex>
        </Box>
      </Wrap>
    </Box>
  )
}

export default RegisterPage
