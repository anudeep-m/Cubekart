import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  productListReducer,
  oneProductReducer,
  productAdditionByAdminReducer,
  productDeleteByAdminReducer,
  productUpdateByAdminReducer,
  productDetailsByAdminReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productsReducers.js'
import { cartReducer } from './reducers/cartReducer.js'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListByAdminReducer,
  userDeleteByAdminReducer,
  userUpdateByAdminReducer,
} from './reducers/userReducers.js'

import {
  allOrdersListByAdminReducer,
  myOrdersListReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './reducers/orderReducer.js'

const reducer = combineReducers({
  productList: productListReducer,
  oneProduct: oneProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrdersList: myOrdersListReducer,
  userList: userListByAdminReducer,
  userDelete: userDeleteByAdminReducer,
  userUpdate: userUpdateByAdminReducer,
  productAdd: productAdditionByAdminReducer,
  productDelete: productDeleteByAdminReducer,
  productUpdate: productUpdateByAdminReducer,
  aboutProduct: productDetailsByAdminReducer,
  orderList: allOrdersListByAdminReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
})

const cartItemsfromLocalStorage = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList'))
  : []
const userInfofromLocalStorage = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressfromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartList: cartItemsfromLocalStorage,
    shippingAddress: shippingAddressfromLocalStorage,
  },
  userLogin: { userInfo: userInfofromLocalStorage },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
