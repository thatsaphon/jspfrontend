import { Box, Text } from '@chakra-ui/layout'
import axios from '../../config/axios'
import { useEffect, useState } from 'react'

function UserProfile() {
  const [profile, setProfile] = useState({})
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/user/me')
      console.log(res)
      setProfile(res.data)
    }
    fetchProfile()
  }, [])
  console.log(profile)
  return (
    <Box>
      <Text>
        ชื่อ {profile.firstName} {profile.lastName}
      </Text>
      <Text>
        ที่อยู่{' '}
        {`${profile.textAddress}, ${profile.subDistrict}, ${profile.district}, ${profile.province}, ${profile.postCode}`}
      </Text>
      <Text>เบอร์โทรศัพท์ {profile.phoneNumber}</Text>
      <Text>อีเมล {profile.email} </Text>
    </Box>
  )
}

export default UserProfile
