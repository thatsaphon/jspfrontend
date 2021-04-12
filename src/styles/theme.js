import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: {
      200: '#424642',
      100: '#536162'
    },
    orangeMain: {
      100: '#fcd553',
      200: '#ebae34'
    },
    blueMain: {
      100: '#11a3d4',
      200: '#046bba'
    },
    muted: {
      300: '#F3F4ED',
      200: '#FCFCFC',
      100: '#FFFFFF'
    }
  },
  fonts: {
    heading: 'Chakra Petch',
    body: 'Chakra Petch'
  }
})
