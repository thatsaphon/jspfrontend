import { Center, Box } from "@chakra-ui/react"
function TextContent() {
  return (
    <Center m="2">
      <Box
        // h="200px"
        minWidth="350px"
        w="750px"
        p="4"
        // border="1px black solid"
        // bg="white"
        borderRadius="xl"
        boxSizing="border-box"
        textAlign="center"
      >
        <p>** Lorem ipsum dolor sit amet. **</p>
        <p>** Lorem ipsum dolor sit amet. **</p>
        <p>** Lorem ipsum dolor sit amet. **</p>
        <p>** Lorem ipsum dolor sit amet. **</p>
      </Box>
    </Center>
  )
}
export default TextContent
