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
  PRODUCT_ADD_BA_RESET,
  PRODUCT_EDIT_BA_REQUEST,
  PRODUCT_EDIT_BA_SUCCESS,
  PRODUCT_EDIT_BA_FAILED,
  PRODUCT_EDIT_BA_RESET,
  PRODUCT_DELETE_BA_REQUEST,
  PRODUCT_DELETE_BA_SUCCESS,
  PRODUCT_DELETE_BA_FAILED,
  PRODUCT_DETAILS_BA_FAILED,
  PRODUCT_DETAILS_BA_SUCCESS,
  PRODUCT_DETAILS_BA_REQUEST,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAILED,
} from '../constants/allConstants.js'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }

    case PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

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

export const productDetailsByAdminReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_BA_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_BA_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_BA_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productAdditionByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_BA_REQUEST:
      return { loading: true, product: {} }
    case PRODUCT_ADD_BA_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_ADD_BA_FAILED:
      return { loading: false, error: action.payload }
    case PRODUCT_ADD_BA_RESET:
      return {}
    default:
      return state
  }
}

export const productDeleteByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_BA_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_BA_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_BA_FAILED:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productUpdateByAdminReducer = (
  state = { product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_EDIT_BA_REQUEST:
      return { loading: true }
    case PRODUCT_EDIT_BA_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_EDIT_BA_FAILED:
      return { loading: false, error: action.payload }
    case PRODUCT_EDIT_BA_RESET:
      return { product: {} }

    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAILED:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}

    default:
      return state
  }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
