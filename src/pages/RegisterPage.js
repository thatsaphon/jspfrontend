import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/input'
import { Box, Wrap, Text, Flex } from '@chakra-ui/layout'
import Header from '../component/layout/Header'
import { Button } from '@chakra-ui/button'
import { useContext, useEffect, useState } from 'react'
import { Select } from '@chakra-ui/select'
import axios from '../config/axios'
import { useHistory } from 'react-router'
import { AuthContext } from '../contexts/AuthContextProvider'
import localStorageService from '../services/localStorageService'
import { ProfileContext } from '../contexts/ProfileContextProvider'
import { useForm } from 'react-hook-form'

function RegisterPage() {
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [textAddress, setTextAddress] = useState('')
  const [address, setAddress] = useState({})
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [subDistricts, setSubDistricts] = useState([])
  const [isPasswordNotMatched, setIsPasswordNotMatched] = useState(false)

  const { setIsAuthenticated } = useContext(AuthContext)
  const { fetchProfile } = useContext(ProfileContext)

  const fetchProvince = async () => {
    const res = await axios.get('/location/province')
    setProvinces(res.data.provinces)
  }
  const fetchDistrict = async () => {
    if (!address.province) return null
    const res = await axios.get('/location/district/' + address.province)
    setDistricts(res.data.districts)
  }
  const fetchSubDistrict = async () => {
    if (!address.district) return null
    const res = await axios.get('/location/subdistrict/' + address.district)
    setSubDistricts(res.data.subDistricts)
  }
  useEffect(() => {
    fetchProvince()
    fetchDistrict()
    fetchSubDistrict()
  }, [address])

  const handleProvinceSelected = (e) => {
    const newAddress = { ...address }
    setAddress({
      ...newAddress,
      province: e.target.value
    })
  }
  const handleDistrictSelected = (e) => {
    const newAddress = { ...address }
    setAddress({
      ...newAddress,
      district: e.target.value
    })
  }
  const handleSubDistrictSelected = (e) => {
    const newAddress = { ...address }
    setAddress({
      ...newAddress,
      subDistrict: e.target.value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await axios.post('/register', {
      username,
      password,
      firstName,
      lastName,
      phoneNumber,
      email,
      textAddress,
      address
    })
    localStorageService.setToken(res.data.token)
    setIsAuthenticated(true)
    fetchProfile()
    history.push('/')
  }

  const handleSubmitRegister = async (data) => {
    if (data.password !== data.confirmPassword)
      return setIsPasswordNotMatched(true)
    const newData = { ...data, ...address }
    console.log(newData)
    const res = await axios.post('/register', newData)
    localStorageService.setToken(res.data.token)
    setIsAuthenticated(true)
    fetchProfile()
    history.push('/')
  }

  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
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

          <form onSubmit={handleSubmit(handleSubmitRegister)}>
            <Input
              placeholder="ชื่อผู้ใช้"
              type="text"
              size="sm"
              bg="muted.100"
              mb={2}
              {...register('username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {isPasswordNotMatched && (
              <Text fontSize="xs" color="red">
                *รหัสผ่านไม่เหมือนกัน
              </Text>
            )}
            <InputGroup size="md">
              <Input
                placeholder="รหัสผ่าน"
                type={show ? 'text' : 'password'}
                pr="4.5rem"
                size="sm"
                bg="muted.100"
                mb={2}
                {...register('password')}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (isPasswordNotMatched) setIsPasswordNotMatched(false)
                }}
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
            <InputGroup size="md">
              <Input
                placeholder="ยืนยันรหัสผ่าน"
                type={show2 ? 'text' : 'password'}
                pr="4.5rem"
                size="sm"
                bg="muted.100"
                mb={2}
                {...register('confirmPassword')}
                onChange={() => {
                  if (isPasswordNotMatched) setIsPasswordNotMatched(false)
                }}
              />
              <InputRightElement w="4.5rem" h="32px">
                <Button
                  size="xs"
                  h="20px"
                  colorScheme="blue"
                  onClick={() => setShow2(!show2)}
                  boxSizing="border-box"
                >
                  {show2 ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Input
              placeholder="ชื่อจริง"
              type="text"
              size="sm"
              bg="muted.100"
              mb={2}
              {...register('firstName')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="นามสกุล"
              type="text"
              size="sm"
              bg="muted.100"
              mb={2}
              {...register('lastName')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              placeholder="เบอร์โทรศัพท์"
              type="text"
              size="sm"
              bg="muted.100"
              mb={2}
              {...register('phoneNumber')}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              placeholder="อีเมล"
              type="text"
              size="sm"
              bg="muted.100"
              mb={2}
              {...register('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <InputGroup>
              <Flex>
                <InputLeftElement h="32px" size="sm" placeholder="รูปภาพ">
                  <Text ml="2rem" textAlign="center">
                    รูปภาพ
                  </Text>
                </InputLeftElement>
                <Input
                  type="file"
                  size="sm"
                  bg="muted.100"
                  mb={2}
                  pl="5rem"
                  {...register('avartar')}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </Flex>
            </InputGroup> */}
            {/* ที่อยู่ */}
            <Input
              placeholder="บ้านเลขที่ / อาคาร / หมู่บ้าน"
              type="text"
              size="sm"
              bg="muted.100"
              mb={2}
              {...register('textAddress')}
              value={textAddress}
              onChange={(e) => setTextAddress(e.target.value)}
            />
            <Select
              placeholder="จังหวัด"
              size="sm"
              bg="muted.100"
              mb={2}
              onChange={handleProvinceSelected}
            >
              {provinces.map((item, index) => (
                <option value={item.nameTh} key={item.id}>
                  {item.nameTh}
                </option>
              ))}
            </Select>
            <Select
              placeholder="อำเภอ/เขต"
              size="sm"
              bg="muted.100"
              mb={2}
              onChange={handleDistrictSelected}
            >
              {districts.map((item, index) => (
                <option value={item.nameTh} key={item.id}>
                  {item.nameTh}
                </option>
              ))}
            </Select>
            <Select
              placeholder="ตำบล/แขวง"
              size="sm"
              bg="muted.100"
              mb={2}
              onChange={handleSubDistrictSelected}
            >
              {subDistricts.map((item, index) => (
                <option value={item.nameTh} key={item.id}>
                  {item.nameTh}
                </option>
              ))}
            </Select>
            <Select
              placeholder="รหัสไปรษณีย์"
              size="sm"
              bg="muted.100"
              {...register('postCode')}
              setAddress
              mb={2}
              onChange={(e) =>
                setAddress({ ...address, postCode: e.target.value })
              }
            >
              {subDistricts
                .filter((item) => item.nameTh === address.subDistrict)
                .map((item, index) => (
                  <option value={item.zipCode} key={item.id}>
                    {item.zipCode}
                  </option>
                ))}
            </Select>
            <Flex align="center" direction="column">
              <Button
                type="submit"
                bg="blueMain.100"
                mt={3}
                // onClick={handleRegister}
              >
                สมัครสมาชิก
              </Button>
            </Flex>
          </form>
        </Box>
      </Wrap>
    </Box>
  )
}

export default RegisterPage
