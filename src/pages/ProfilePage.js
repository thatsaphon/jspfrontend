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
import { useForm } from 'react-hook-form'

function ProfilePage() {
  const [orders, setOrders] = useState([])
  const { profile, fetchProfile, setProfile } = useContext(ProfileContext)
  const { register, handleSubmit } = useForm()
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
  const handleChangePicture = async (e) => {
    try {
      console.log(e.target.files[0])
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      const res = await axios.post('/user/picture', formData)
      console.log(res)
      const newProfile = { ...profile, path: res.data.imagePath }
      setProfile(newProfile)
    } catch (err) {
      console.dir(err)
    }
  }
  const handleDeletePicture = async () => {
    await axios.delete('/user/picture')
    const newProfile = { ...profile, path: '' }
    setProfile(newProfile)
  }

  return (
    <Box>
      <Header />
      <Wrap justify="center" p={3}>
        <Flex w="400px" justify="center" py={5}>
          <Flex direction="column">
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
                _hover={{
                  cursor: 'pointer',
                  color: 'gray.700',
                  textShadow: 'lg'
                }}
              >
                <Text color="gray.600" _hover={{ color: 'black' }}>
                  เปลี่ยนรูปภาพ
                </Text>
              </FormLabel>
              <Input type="file" hidden onChange={handleChangePicture} />
            </FormControl>
            <Flex justify="center">
              <Text
                fontSize="xs"
                color="gray.500"
                as="u"
                textAlign="center"
                _hover={{ cursor: 'pointer', color: 'gray.700' }}
                onClick={handleDeletePicture}
              >
                ลบรูปภาพ
              </Text>
            </Flex>
          </Flex>
        </Flex>
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
