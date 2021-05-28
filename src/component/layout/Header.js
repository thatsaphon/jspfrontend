import {
  Center,
  Flex,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContextProvider'
import { ProfileContext } from '../../contexts/ProfileContextProvider'
import AvatarMenu from './AvatarMenu'

function Header() {
  const history = useHistory()
  const { isAuthenticated } = useContext(AuthContext)
  const { profile } = useContext(ProfileContext)
  // const [isHover, setIsHover] = useState(false)
  return (
    <Center>
      <Flex
        // m={[2, 3]}
        mb={3}
        minW="350px"
        w="full"
        p="3"
        bg="orange.100"
        // border="2px solid darkblue"
        // borderRadius="xl"
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
        {profile.userType === 'ADMIN' && (
          <Menu>
            <MenuButton>
              <Text
                mx="2"
                p="1"
                onClick={() => history.push('/admin')}
                _hover={{
                  boxShadow: 'md',
                  cursor: 'pointer',
                  border: '1px',
                  rounded: 'xl'
                }}
                _active={{ boxShadow: 'lg' }}
              >
                Admin
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => history.push('/admin/create/product')}>
                Create Product
              </MenuItem>
              <MenuItem onClick={() => history.push('/admin/manage/product')}>
                Manage Product
              </MenuItem>
              {/* <MenuItem onClick={() => history.push('/admin/manage/stock')}>
                Manage Stock
              </MenuItem> */}
              <MenuItem onClick={() => history.push('/admin/manage/order')}>
                Manage Order
              </MenuItem>
            </MenuList>
          </Menu>
        )}
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
