import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header'
import Footer from './components/footer'
import HomeScreen from './screens/homescreen'
import ProductScreen from './screens/productscreen'
import CartScreen from './screens/cartscreen '
import SigninScreen from './screens/siginscreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/sign-in' component={SigninScreen} />
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
