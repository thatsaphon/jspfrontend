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
import SingleOrderPage from './pages/SingleOrderPage'
import AdminCreateProduct from './pages/AdminCreateProduct'
import AdminManageProduct from './pages/AdminManageProduct'
import AdminManageStock from './pages/AdminManageStock'
import AdminManageOrder from './pages/AdminManageOrder'
import { useContext } from 'react'
import { ProfileContext } from './contexts/ProfileContextProvider'
import AdminEditProduct from './pages/AdminEditProduct'

function App() {
  const { profile } = useContext(ProfileContext)
  const adminRoute = [
    { path: '/admin/create/product', component: AdminCreateProduct },
    { path: '/admin/manage/product', component: AdminManageProduct },
    { path: '/admin/manage/product/:id', component: AdminEditProduct },
    { path: '/admin/manage/stock', component: AdminManageStock },
    { path: '/admin/manage/order', component: AdminManageOrder }
  ]
  const privateRoute = [{ path: '/profile', component: ProfilePage }]
  const publicRoute = [
    { path: '/register', component: RegisterPage },
    { path: '/login', component: LogInPage }
  ]
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/product" component={ProductPage} />
        <Route exact path="/design-system" component={DesignSystemPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/product/:id" component={SingleProductPage} />
        <Route exact path="/order/:id" component={SingleOrderPage} />
        {!profile.id &&
          publicRoute.map((item, index) => (
            <Route
              exact
              path={item.path}
              component={item.component}
              key={index}
            />
          ))}
        {profile.id &&
          privateRoute.map((item, index) => (
            <Route
              exact
              path={item.path}
              component={item.component}
              key={index}
            />
          ))}
        {profile &&
          profile.userType === 'ADMIN' &&
          adminRoute.map((item, index) => (
            <Route
              exact
              path={item.path}
              component={item.component}
              key={index}
            />
          ))}
        {/* <Redirect to="/" /> */}
      </Switch>
    </>
  )
}

export default App
