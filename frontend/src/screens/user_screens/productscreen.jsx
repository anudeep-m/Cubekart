import React, { useState, useEffect } from 'react'
import Meta from '../../components/meta'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  FormGroup,
  FormLabel,
} from 'react-bootstrap'
import Rating from '../../components/rating'
import Loader from '../../components/loader.jsx'
import Message from '../../components/message.jsx'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/allConstants.js'
import {
  singleProduct,
  createProductReview,
} from '../../actions/productActions.js'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const oneProduct = useSelector((state) => state.oneProduct)
  const { loading, error, product } = oneProduct

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(singleProduct(match.params.id))
  }, [dispatch, match, successProductReview])

  const datecutter = (date) => {
    date = date.substring(0, 10)
    date =
      date.substring(8, 10) +
      '-' +
      date.substring(5, 7) +
      '-' +
      date.substring(0, 4)
    return date
  }

  const addtoCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
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
        <>
          <Meta title={product.name} />
          <Row className='mx-3 d-flex justify-content-around'>
            <Col sm={12} md={10} lg={5} className='text-center my-2'>
              <ListGroup variant='flush' className='p-3'>
                <Image src={product.image} alt={product.name} fluid />
              </ListGroup>
            </Col>

            <Col sm={7} md={4} lg={7}>
              <Row>
                <Col sm={9} md={6} lg={6} className='my-2'>
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
                  </ListGroup>
                </Col>

                <Col sm={7} md={4} lg={4}>
                  <ListGroup
                    className='py-3 px-0 text-center my-2'
                    variant='flush'
                  >
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
                              {[...Array(product.countinStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
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
              <Row>
                <Col sm={7} md={4} lg={10}>
                  <ListGroup.Item varaint='flush'>
                    <h2>REVIEWS</h2>
                    <ListGroup>
                      {product.reviews.length === 0 ? (
                        <Message variant='info'>No Reviews</Message>
                      ) : (
                        product.reviews.map((review) => (
                          <ListGroup.Item className='m-0 py-2'>
                            <Row>
                              <Col>
                                <strong className='m-0 py-1'>
                                  {review.name}
                                </strong>
                                <p className='m-0 py-1'>
                                  {datecutter(review.createdAt)}
                                </p>
                              </Col>

                              <Col>
                                <Rating value={review.rating} />
                                <p className='m-0 py-1'>{review.comment} </p>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))
                      )}
                      <ListGroup.Item>
                        <h4>WRITE A CUSTOMER REVIEW</h4>
                        {errorProductReview && (
                          <Message varaint='danger'>
                            {errorProductReview}
                          </Message>
                        )}
                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <FormGroup controlId='rating'>
                              <FormLabel>Rating</FormLabel>
                              <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => {
                                  setRating(e.target.value)
                                }}
                              >
                                <option valaue=''>Select rating</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                              </Form.Control>
                            </FormGroup>

                            <Form.Group controlId='comment'>
                              <FormLabel>Comment</FormLabel>
                              <Form.Control
                                as='textarea'
                                row='3'
                                value={comment}
                                onChange={(e) => {
                                  setComment(e.target.value)
                                }}
                              ></Form.Control>
                            </Form.Group>
                            <Button
                              type='submit'
                              varaint='primary'
                              className='m-1'
                            >
                              Submit
                            </Button>
                          </Form>
                        ) : (
                          <Message variant='info'>
                            <Link to='/login'>Please Login </Link>
                            to wirte a review
                          </Message>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </ListGroup.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
