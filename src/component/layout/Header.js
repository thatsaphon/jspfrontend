import { Center, Flex, Spacer, Avatar, Text } from "@chakra-ui/react"

function Header() {
  return (
    <Center>
      <Flex
        m={[2, 3]}
        w="780px"
        p="3"
        bg="orange.50"
        border="2px solid darkblue"
        borderRadius="xl"
        align="flex-end"
      >
        <Text mx="2">Home</Text>
        <Text mx="2">Products</Text>
        <Spacer />
        <Avatar name="Thatsaphon Sukanantatham" />
      </Flex>
    </Center>
  )
}

export default Header
