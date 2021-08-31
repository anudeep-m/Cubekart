import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/allConstants'

export const cartReducer = (
  state = { cartList: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const itemExist = state.cartList.find((x) => x._id === item._id)

      if (itemExist) {
        return {
          ...state,
          cartList: state.cartList.map((x) =>
            x._id === itemExist._id ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartList: [...state.cartList, item],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartList: state.cartList.filter((x) => x._id !== action.payload),
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    default:
      return state
  }
}
