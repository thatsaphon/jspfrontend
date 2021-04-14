import { Avatar } from '@chakra-ui/avatar'
import {
  Box,
  Center,
  Circle,
  Flex,
  Grid,
  Spacer,
  Text,
  Wrap
} from '@chakra-ui/layout'
import React from 'react'
import Header from '../component/layout/Header'

function ProfilePage() {
  return (
    <Box>
      <Header />
      <Wrap justify="center" p={3}>
        <Center w="400px">
          <Flex direction="column" align="center">
            <Circle boxSize="180px">
              <Avatar
                name="Thatsaphon Sukanantatham"
                size="xl"
                w="full"
                h="full"
              />
            </Circle>
            <Text as="u" mt={3}>
              เปลี่ยนรูปภาพ
            </Text>
          </Flex>
        </Center>
        <Flex direction="column">
          <Wrap>
            <Text
              fontSize="sm"
              border="1px solid"
              borderColor="blueMain.100"
              p={2}
            >
              ประวัติการซื้อ
            </Text>
            <Text
              fontSize="sm"
              border="1px solid"
              borderColor="blueMain.100"
              p={2}
            >
              ข้อมูลส่วนตัว
            </Text>
          </Wrap>
          <Flex
            // border="1px solid"
            // borderColor="blueMain.100"
            minW="350px"
            bg="muted.300"
            mt={2}
            p={3}
            direction="column"
            rounded="20px"
          >
            <Text>ชื่อ</Text>
            <Text>ที่อยู่</Text>
            <Text>เบอร์โทรศัพท์</Text>
            <Text>อีเมล</Text>
          </Flex>
          <Flex
            // border="1px solid"
            // borderColor="blueMain.100"
            minW="350px"
            bg="muted.300"
            mt={2}
            p={3}
            direction="column"
            rounded="20px"
          >
            <Flex
              border="1px solid"
              borderColor="blueMain.200"
              fontSize="sm"
              p={3}
              align="center"
              rounded="20px"
            >
              <Grid gridGap={2}>
                <Text>หมายเลขคำสั่งซื้อ</Text>
                <Text>วันที่สั่งซื้อ</Text>
              </Grid>
              <Spacer />
              <Text>800</Text>
            </Flex>
          </Flex>
        </Flex>
      </Wrap>
    </Box>
  )
}

export default ProfilePage
