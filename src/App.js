import logo from './logo.svg'
import './App.css'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import DesignSystemPage from './pages/DesignSystemPage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import SingleProductPage from './pages/SingleProductPage'
import ProfilePage from './pages/ProfilePage'
function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/product" component={ProductPage} />
      <Route exact path="/design-system" component={DesignSystemPage} />
      <Route exact path="/login" component={LogInPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/cart" component={CartPage} />
      <Route exact path="/product/:id" component={SingleProductPage} />
      <Route exact path="/profile" component={ProfilePage} />
    </Switch>
  )
}

export default App
