import {
  Center,
  Flex,
  Spacer,
  Avatar,
  Text,
  Image,
  Square
} from '@chakra-ui/react'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContextProvider'
import AvatarMenu from './AvatarMenu'

function Header() {
  const history = useHistory()
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Center>
      <Flex
        // m={[2, 3]}
        mb={3}
        w="full"
        p="3"
        bg="orange.50"
        // border="2px solid darkblue"
        borderRadius="xl"
        align="flex-end"
      >
        <Text
          mx="2"
          p="1"
          onClick={() => history.push('/')}
          _hover={{
            boxShadow: 'md',
            cursor: 'pointer',
            border: '1px',
            rounded: 'xl'
          }}
          _active={{ boxShadow: 'lg' }}
        >
          Home
        </Text>
        <Text
          mx="2"
          p="1"
          onClick={() => history.push('/product')}
          _hover={{
            boxShadow: 'md',
            cursor: 'pointer',
            border: '1px',
            rounded: 'xl'
          }}
          _active={{ boxShadow: 'lg' }}
        >
          Products
        </Text>
        <Text
          mx="2"
          p="1"
          onClick={() => history.push('/cart')}
          _hover={{
            boxShadow: 'md',
            cursor: 'pointer',
            border: '1px',
            rounded: 'xl'
          }}
          _active={{ boxShadow: 'lg' }}
        >
          Cart
        </Text>
        <Spacer />
        {!isAuthenticated && (
          <Text
            mx="2"
            p="1"
            onClick={() => history.push('/login')}
            _hover={{
              boxShadow: 'md',
              cursor: 'pointer',
              border: '1px',
              rounded: 'xl'
            }}
            _active={{ boxShadow: 'lg' }}
          >
            Log-in
          </Text>
        )}
        {isAuthenticated && <AvatarMenu />}
      </Flex>
    </Center>
  )
}

export default Header
