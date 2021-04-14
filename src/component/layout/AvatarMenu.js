import { Avatar } from '@chakra-ui/avatar'
import { Box } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../contexts/AuthContextProvider'
import localStorageService from '../../services/localStorageService'

function AvatarMenu(children) {
  const { setIsAuthenticated } = useContext(AuthContext)
  const history = useHistory()
  const handleLogout = () => {
    localStorageService.clearToken()
    setIsAuthenticated(false)
  }
  return (
    <Menu>
      <MenuButton>
        {/* Actions */}
        <Avatar
          name="Thatsaphon Sukanantatham"
          onClick={() => history.push('/profile')}
          _hover={{
            boxShadow: 'md',
            cursor: 'pointer',
            border: '1px'
          }}
          _active={{ boxShadow: 'lg' }}
        />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => history.push('/profile')}>
          View Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AvatarMenu
