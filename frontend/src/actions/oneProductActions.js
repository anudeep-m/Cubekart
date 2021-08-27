import {
  ONE_PRODUCT_REQUEST,
  ONE_PRODUCT_SUCCESS,
  ONE_PRODUCT_FAILED,
} from '../constants/allConstants.js'
import axios from 'axios'

export const singleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: ONE_PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: ONE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ONE_PRODUCT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
