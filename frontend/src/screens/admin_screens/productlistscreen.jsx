import React, { useEffect } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/message'
import Loader from '../../components/loader'
import {
  addProductBA,
  deleteProductBA,
  listProducts,
} from '../../actions/productActions'

import { PRODUCT_ADD_BA_RESET } from '../../constants/allConstants'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productAdd = useSelector((state) => state.productAdd)
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
    product: addedProduct,
  } = productAdd

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    dispatch({ type: PRODUCT_ADD_BA_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }
    if (successAdd) {
      history.push(`/admin/product/${addedProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [history, userInfo, dispatch, successDelete, successAdd, addedProduct])

  const deleteproductHandler = (productId) => {
    if (window.confirm('Are you sure? ')) {
      dispatch(deleteProductBA(productId))
    }
  }
  const createProductHandler = () => {
    dispatch(addProductBA())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2 className='py-1'>Products</h2>
        </Col>

        <Col className='text-right'>
          <Button className='my-4' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingAdd && <Loader />}
      {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>BRAND</th>
              <th>PRICE</th>
              <th>INVENTORY</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>₹ {product.price}</td>
                <td> {product.countinStock}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button className='btn-sm mx-1' variant='light'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm mx-1'
                    variant='danger'
                    onClick={() => deleteproductHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
