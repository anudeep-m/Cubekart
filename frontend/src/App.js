import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header'
import Footer from './components/footer'
import HomeScreen from './screens/user_screens/homescreen'
import ProductScreen from './screens/user_screens/productscreen'
import CartScreen from './screens/user_screens/cartscreen '
import LoginScreen from './screens/user_screens/loginscreen'
import RegisterScreen from './screens/user_screens/registerscreen'
import ProfileScreen from './screens/user_screens/profilescreen'
import ShippingScreen from './screens/user_screens/shippingscreen'
import PaymentScreen from './screens/user_screens/payementscreen'
import PlaceOrderScreen from './screens/user_screens/placeorderscreen'
import OrderScreen from './screens/user_screens/orderscreen'
import UserListScreen from './screens/admin_screens/userlistscreen'
import UserEditScreen from './screens/admin_screens/usereditscreen'
import ProductListScreen from './screens/admin_screens/productlistscreen'
import ProductEditScreen from './screens/admin_screens/producteditscreen'
import OrderListScreen from './screens/admin_screens/orderlistscreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pagenumber'
            component={HomeScreen}
          />
          <Route path='/page/:pagenumber' component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pagenumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
