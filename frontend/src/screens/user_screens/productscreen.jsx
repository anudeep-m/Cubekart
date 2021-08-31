import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct } from '../../actions/productActions.js'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../../components/rating'
import Loader from '../../components/loader.jsx'
import Message from '../../components/message.jsx'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const oneProduct = useSelector((state) => state.oneProduct)
  const { loading, error, product } = oneProduct

  useEffect(() => {
    dispatch(singleProduct(match.params.id))
  }, [dispatch, match])

  const addtoCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  return (
    <>
      <Link className='btn btn-primary m-4' to='/'>
        Go Back{' '}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='mx-3 d-flex justify-content-around'>
          <Col sm={12} md={10} lg={5} className='text-center my-2'>
            <ListGroup variant='flush' className='p-3'>
              <Image src={product.image} alt={product.name} fluid />
            </ListGroup>
          </Col>

          <Col sm={9} md={6} lg={4} className='my-2'>
            <ListGroup variant='flush' className='p-3'>
              <ListGroup.Item>
                <strong>{product.brand}</strong>
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>Size: {product.size}</ListGroup.Item>

              <ListGroup.Item>Dimensions: {product.dimensions}</ListGroup.Item>

              <ListGroup.Item>Colour: {product.colour}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col sm={7} md={4} lg={3}>
            <ListGroup className='py-3 px-0 text-center my-2' variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>₹ {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <strong>
                      {' '}
                      {product.countinStock > 0 ? (
                        <p
                          className='m-0'
                          style={{ color: 'green', fontSize: 16 }}
                        >
                          In Stock
                        </p>
                      ) : (
                        <p
                          className='m-0'
                          style={{ color: 'red', fontSize: 16 }}
                        >
                          Out of Stock
                        </p>
                      )}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countinStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col className='py-2'>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className='py-2 m-0'
                      >
                        {[...Array(product.countinStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item className='text-center'>
                <Button
                  onClick={addtoCartHandler}
                  className='btn-block btn-info'
                  type='button'
                  disabled={product.countinStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
