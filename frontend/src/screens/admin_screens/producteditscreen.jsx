import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Row, Col, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails, updateProductBA } from '../../actions/productActions'
import { PRODUCT_EDIT_BA_RESET } from '../../constants/allConstants'
import Loader from '../../components/loader.jsx'
import Message from '../../components/message.jsx'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [countinStock, setCountInStock] = useState(0)
  const [size, setSize] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const aboutProduct = useSelector((state) => state.aboutProduct)
  const { loading, error, product } = aboutProduct

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_EDIT_BA_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetails(productId))
      } else {
        setName(product.name)
        setBrand(product.brand)
        setImage(product.image)
        setPrice(product.price)
        setCountInStock(product.countinStock)
        setSize(product.size)
      }
    }
  }, [history, dispatch, productId, product, successUpdate])

  const uploadeFilenadler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProductBA({
        _id: productId,
        name,
        brand,
        image,
        price,
        countinStock,
        size,
      })
    )
  }
  return (
    <>
      <Link className='btn btn-primary mt-4 ml-4' to='/admin/productlist'>
        Go Back{' '}
      </Link>
      <h2 className='text-center pb-2'>Edit Product</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler} className='d-flex flex-column'>
          <Col>
            <Row md='5' className='justify-content-center'>
              {!image ? <Loader /> : <Image src={image} />}
            </Row>
            <Row md='2'>
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
            </Row>
            <Row md='2'>
              <Form.Group controlId='image' className='my-2'>
                <Form.Label className='mx-2'>Image</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='Enter image url'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.File
                      id='image-file'
                      custom
                      onChange={uploadeFilenadler}
                      className='my-2'
                    ></Form.File>
                    {uploading && <Loader />}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId='size' className='my-2'>
                <Form.Label className='mx-2'>Size</Form.Label>
                <Form.Control
                  as='select'
                  type='option'
                  placeholder='Enter size'
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {' '}
                  <option valaue=''>Select size</option>
                  <option key='1' value='Small'>
                    Small
                  </option>{' '}
                  <option key='2' value='Medium'>
                    Medium
                  </option>{' '}
                  <option key='3' value='Large'>
                    Large
                  </option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row md='2'>
              <Form.Group controlId='price' className='my-2'>
                <Form.Label className='mx-2'>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='countinStock' className='my-2'>
                <Form.Label className='mx-2'>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter count in stock'
                  value={countinStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
          </Col>
          <Button type='submit' variant='primary' className='my-2 mx-auto'>
            Update
          </Button>
        </Form>
      )}
    </>
  )
}

export default ProductEditScreen
