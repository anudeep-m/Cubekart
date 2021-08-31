import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  ONE_PRODUCT_REQUEST,
  ONE_PRODUCT_SUCCESS,
  ONE_PRODUCT_FAILED,
  PRODUCT_ADD_BA_REQUEST,
  PRODUCT_ADD_BA_SUCCESS,
  PRODUCT_ADD_BA_FAILED,
  PRODUCT_DELETE_BA_REQUEST,
  PRODUCT_DELETE_BA_SUCCESS,
  PRODUCT_DELETE_BA_FAILED,
  PRODUCT_EDIT_BA_REQUEST,
  PRODUCT_EDIT_BA_SUCCESS,
  PRODUCT_EDIT_BA_FAILED,
} from '../constants/allConstants.js'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products')

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

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

export const addProductBA = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADD_BA_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch({ type: PRODUCT_ADD_BA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_ADD_BA_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProductBA = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_BA_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${productId}`, config)

    dispatch({ type: PRODUCT_DELETE_BA_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_BA_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProductBA = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_EDIT_BA_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({ type: PRODUCT_EDIT_BA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_BA_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
