import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './styles/theme'
import Fonts from './styles/Fonts'
import AuthContextProvider from './contexts/AuthContextProvider'
import CartContextProvider from './contexts/CartContextProvider'
import ProfileContextProvider from './contexts/ProfileContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProfileContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <ChakraProvider theme={theme}>
              <Fonts />
              <App />
            </ChakraProvider>
          </BrowserRouter>
        </CartContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
