import { Avatar } from '@chakra-ui/avatar'
import { Box, Center, Circle, Flex, Text, Wrap } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import axios from '../config/axios'
import { useEffect, useState } from 'react'
import Header from '../component/layout/Header'
import UserOrder from '../component/profile/UserOrder'
import UserProfile from '../component/profile/UserProfile'
import UserSummary from '../component/profile/UserSummary'

function ProfilePage() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get('/order')
        setOrders(res.data.order)
      } catch (err) {
        console.dir(err)
      }
    }
    fetchOrder()
  }, [])

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
          <Tabs>
            <TabList>
              <Tab>ข้อมูลส่วนตัว</Tab>
              <Tab>ประวัติการซื้อ</Tab>
              <Tab>สรุปยอดซื้อ</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <UserProfile />
              </TabPanel>

              <TabPanel>
                <UserOrder orders={orders} />
              </TabPanel>
              <TabPanel>
                <UserSummary orders={orders} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Wrap>
    </Box>
  )
}

export default ProfilePage
