import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productsReducers.js'
import { oneProductReducer } from './reducers/oneProductReducer.js'
import { cartReducer } from './reducers/cartReducer.js'

const reducer = combineReducers({
  productList: productListReducer,
  oneProduct: oneProductReducer,
  cart: cartReducer,
})
const cartItemsfromLocalStorage = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList'))
  : []

const initialState = {
  cart: { cartList: cartItemsfromLocalStorage },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
