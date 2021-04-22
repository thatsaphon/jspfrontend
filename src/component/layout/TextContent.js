import {
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  PhoneIcon,
  QuestionIcon
} from '@chakra-ui/icons'
import { Center, Box, Text, Flex } from '@chakra-ui/react'

function TextContent() {
  return (
    <Center m="2">
      <Box
        // h="200px"
        minWidth="350px"
        w="750px"
        // mw="350px"
        p="4"
        // border="1px black solid"
        // bg="white"
        borderRadius="xl"
        boxSizing="border-box"
        textAlign="center"
        fontSize="md"
      >
        <Flex>
          <QuestionIcon color="red.400" mt={1} mr={2} />
          <Text>เปลี่ยนน้ำมันเครื่องทำไม่ต้องนำรถเข้าศูนย์</Text>
        </Flex>
        <Flex>
          <CheckCircleIcon color="green.400" mt={1} mr={2} />
          <Text>เพียงมีกรองและน้ำมันเครื่องก็สามารถทำเองได้</Text>
        </Flex>
        <Flex>
          <QuestionIcon color="red.400" mt={1} mr={2} />
          <Text>รถเสียแต่ไม่รู้ราคาอะไหล่ ไม่รู้จะโดนโก่งราคาไหม</Text>
        </Flex>
        <Flex>
          <CheckCircleIcon color="green.400" mt={1} mr={2} />
          <Text>
            สามารถเช็คราคาและสั่งซื้อจากทางร้านเรา
            ซึ่งขายอะไหล่ที่มีคุณภาพในราคายุติธรรม
          </Text>
        </Flex>
        <Flex>
          <ArrowRightIcon color="gray.400" mt={1} mr={2} />
          <Text>ร้าน จ.สุพรรณบุรีอะไหล่</Text>
        </Flex>
        <Flex>
          <ArrowRightIcon color="gray.400" mt={1} mr={2} />
          <Text>จำหน่ายอะไหล่รถยนต์ทุกชนิด</Text>
        </Flex>
        <Flex>
          <ArrowRightIcon color="gray.400" mt={1} mr={2} />
          <Text>อะไหล่เครื่อง 6D 31T</Text>
        </Flex>
        <Flex>
          <PhoneIcon color="green.400" mt={1} mr={2} />
          <Text>บริการสั่งอะไหล่ด่วน โทร 035503351 035503316</Text>
        </Flex>
        <Flex>
          <PhoneIcon color="green.400" mt={1} mr={2} />
          <Text>0882923774 Fax. 035523670</Text>
        </Flex>
      </Box>
    </Center>
  )
}
export default TextContent
