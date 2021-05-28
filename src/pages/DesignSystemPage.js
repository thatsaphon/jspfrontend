import { Box, Center, Stack, Wrap, Text } from '@chakra-ui/react'

function DesignSystemPage() {
  return (
    <Center p={5}>
      <Wrap gridGap={8} justify="center">
        <Stack textAlign="center">
          <Box bg="primary.100" p={5} boxSize="150px" rounded="20px"></Box>
          <Text>primary.100</Text>
        </Stack>
        <Stack textAlign="center">
          <Box bg="primary.200" p={5} boxSize="150px" rounded="20px"></Box>
          <Text>primary.200</Text>
        </Stack>
        <Stack textAlign="center">
          <Box bg="orangeMain.100" p={5} boxSize="150px" rounded="20px"></Box>
          <Text>orangeMain.100</Text>
        </Stack>
        <Stack textAlign="center">
          <Box bg="orangeMain.200" p={5} boxSize="150px" rounded="20px"></Box>
          <Text>orangeMain.200</Text>
        </Stack>
        <Stack textAlign="center">
          <Box bg="blueMain.100" p={5} boxSize="150px" rounded="20px"></Box>
          <Text>blueMain.100</Text>
        </Stack>
        <Stack textAlign="center">
          <Box bg="blueMain.200" p={5} boxSize="150px" rounded="20px"></Box>
          <Text>blueMain.200</Text>
        </Stack>
        <Stack textAlign="center">
          <Box
            bg="muted.100"
            p={5}
            boxSize="150px"
            border="solid 1px"
            rounded="20px"
          ></Box>
          <Text>muted.100</Text>
        </Stack>
        <Stack textAlign="center">
          <Box
            bg="muted.200"
            p={5}
            boxSize="150px"
            border="solid 1px"
            rounded="20px"
          ></Box>
          <Text>muted.200</Text>
        </Stack>
        <Stack textAlign="center">
          <Box
            bg="muted.300"
            p={5}
            boxSize="150px"
            border="solid 1px"
            rounded="20px"
          ></Box>
          <Text>muted.300</Text>
        </Stack>
      </Wrap>
    </Center>
  )
}

export default DesignSystemPage
