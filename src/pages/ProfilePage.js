import { Avatar } from '@chakra-ui/avatar'
import { Box, Center, Circle, Flex, Text, Wrap } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import axios from '../config/axios'
import { useContext, useEffect, useState } from 'react'
import Header from '../component/layout/Header'
import UserOrder from '../component/profile/UserOrder'
import UserProfile from '../component/profile/UserProfile'
import UserSummary from '../component/profile/UserSummary'
import { ProfileContext } from '../contexts/ProfileContextProvider'
import { Input } from '@chakra-ui/input'
import { FormControl, FormLabel } from '@chakra-ui/form-control'

function ProfilePage() {
  const [orders, setOrders] = useState([])
  const { profile } = useContext(ProfileContext)
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
                src={profile.path}
                name={`${profile.firstName} ${profile.lastName}`}
                size="xl"
                w="full"
                h="full"
              />
            </Circle>
            <FormControl>
              <FormLabel
                mt={3}
                textAlign="center"
                textDecor="underline"
                ml="12px"
              >
                เปลี่ยนรูปภาพ
              </FormLabel>
              <Input type="file" hidden />
            </FormControl>
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
