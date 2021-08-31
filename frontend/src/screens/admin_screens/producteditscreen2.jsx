import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductBA } from '../../actions/productActions'
import { PRODUCT_EDIT_BA_RESET } from '../../constants/allConstants'
import Loader from '../../components/loader.jsx'
import Message from '../../components/message.jsx'

const ProductEditScreen2 = ({ match }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [model_no, setModelNo] = useState('')
  const [price, setPrice] = useState('')
  const [countinStock, setCountInStock] = useState('')
  const [size, setSize] = useState('')
  const [width, setWidth] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [colour, setColour] = useState('')

  const dispatch = useDispatch()

  const oneProduct = useSelector((state) => state.oneProduct)
  const { loading, error, product } = oneProduct

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    console.log(product)
    if (successUpdate) {
      dispatch({ type: PRODUCT_EDIT_BA_RESET })
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(updateProductBA(productId))
      } else {
        setName(product.name)
        setBrand(product.brand)
        setModelNo(product.model_no)
        setPrice(product.price)
        setCountInStock(product.countinStock)
        setSize(product.size)
        setWidth(product.width)
        setDimensions(product.dimensions)
        setColour(product.colour)
      }
    }
  }, [dispatch, productId, product, successUpdate])

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(
      updateProductBA({
        _id: productId,
        name,
        countinStock,
        model_no,
        brand,
        price,
        size,
        width,
        dimensions,
        colour,
      })
    )
  }
  return (
    <>
      <Link className='btn btn-primary m-4' to='/admin/productlist'>
        Go Back{' '}
      </Link>
      <h2 className='text-center py-3'>Product Edit</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler} className='d-flex flex-column'>
          <Row>
            <Col md='4'>
              <Form.Group controlId='name' className='my-2'>
                <Form.Label className='mx-2'>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Product Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='brand' className='my-2'>
                <Form.Label className='mx-2'>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='model_no' className='my-2'>
                <Form.Label className='mx-2'>Model No</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Model No'
                  value={model_no}
                  onChange={(e) => setModelNo(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group controlId='price' className='my-2'>
                <Form.Label className='mx-2'>Price</Form.Label>
                <Form.Control
                  type='value'
                  placeholder='Enter Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='countinStock' className='my-2'>
                <Form.Label className='mx-2'>Count In Stock</Form.Label>
                <Form.Control
                  type='value'
                  placeholder='Enter count in stock'
                  value={countinStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='size' className='my-2'>
                <Form.Label className='mx-2'>Size</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter size'
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group controlId='width' className='my-2'>
                <Form.Label className='mx-2'>Count In Stock</Form.Label>
                <Form.Control
                  type='value'
                  placeholder='Enter width'
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='dimensions' className='my-2'>
                <Form.Label className='mx-2'>Dimensions</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter dimensions'
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='colour' className='my-2'>
                <Form.Label className='mx-2'>Colour</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter colour'
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Button type='submit' variant='primary' className='my-2 mx-auto'>
            Update
          </Button>
        </Form>
      )}
    </>
  )
}

export default ProductEditScreen2
