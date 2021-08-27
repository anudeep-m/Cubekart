import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/allConstants'

export const cartReducer = (state = { cartList: [] }, action) => {
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
    default:
      return state
  }
}
