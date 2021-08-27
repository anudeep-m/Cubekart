import {
  ONE_PRODUCT_REQUEST,
  ONE_PRODUCT_SUCCESS,
  ONE_PRODUCT_FAILED,
} from '../constants/allConstants.js'

export const oneProductReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ONE_PRODUCT_REQUEST:
      return { loading: true, product: { reviews: [] } }
    case ONE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }
    case ONE_PRODUCT_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
