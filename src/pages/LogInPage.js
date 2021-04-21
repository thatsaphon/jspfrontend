import { useForm } from 'react-hook-form'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Center, Flex, Text, Wrap } from '@chakra-ui/layout'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../component/layout/Header'
import localStorageService from '../services/localStorageService'
import axios from '../config/axios'
import { AuthContext } from '../contexts/AuthContextProvider'
import { CartContext } from '../contexts/CartContextProvider'
import { ProfileContext } from '../contexts/ProfileContextProvider'

function LogInPage() {
  const history = useHistory()
  const { setIsAuthenticated } = useContext(AuthContext)
  const { fetchProfile } = useContext(ProfileContext)
  const { fetchCart } = useContext(CartContext)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/login', data)
      localStorageService.setToken(res.data.token)
      setIsAuthenticated(true)
      fetchProfile()
      fetchCart()
      history.push('/')
    } catch (err) {
      console.dir(err)
    }
  }

  return (
    <Box>
      <Header />
      <Wrap justify="center" m={8}>
        <Box
          w="400px"
          p={8}
          //   border="solid"
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
            Log-in
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('username', { required: 'username is required' })}
              type="text"
              placeholder="username"
              size="sm"
              bg="muted.100"
            />
            {errors.username && (
              <Text color="red" fontSize="sm" px="3">
                {errors.username.message}
              </Text>
            )}
            <Input
              {...register('password', { required: 'password is required' })}
              type="password"
              placeholder="password"
              size="sm"
              bg="muted.100"
              my={2}
            />
            {errors.password && (
              <Text color="red" fontSize="sm" px="3">
                {errors.password.message}
              </Text>
            )}
            <Flex align="center" direction="column">
              <Button type="submit" bg="blueMain.100" mt={3}>
                Log in
              </Button>
              <Text as="u">forget-password</Text>
              <Center w="300px" borderBottom="1px solid gray" mt="3"></Center>
              <Text
                as="u"
                onClick={() => history.push('/register')}
                _hover={{
                  boxShadow: 'md',
                  cursor: 'pointer'
                }}
                _active={{ boxShadow: 'lg' }}
              >
                register
              </Text>
            </Flex>
          </form>
        </Box>
      </Wrap>
    </Box>
  )
}
export default LogInPage
