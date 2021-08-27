import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/message.jsx'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productid = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartList } = cart

  useEffect(() => {
    dispatch(addToCart(productid, qty))
  }, [dispatch, productid, qty])

  const removefromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <div className='d-flex'>
        {/* <Link to='/' className='btn btn-primary my-3'>
          Go Back
        </Link> */}
        <h2 className='align-middle my-4 mx-auto'>Shopping Cart</h2>
      </div>

      {cartList.length === 0 ? (
        <Message variant='alert'>
          <h4 className='mx-2 p-2 my-auto'>Your cart is empty </h4>
          <Link to='/' className='btn btn-info mx-2 px-4 py-auto '>
            Go Back to Shop
          </Link>
        </Message>
      ) : (
        <Row className='mx-auto '>
          <Col lg='9' md='8' sm='12' className='mb-4 px-0'>
            <ListGroup variant='flush' className='py-3 '>
              {cartList.map((item) => (
                <ListGroup.Item key={item._id} className='my-2'>
                  <Row>
                    <Col lg='2' md='4' sm='3' xs='4' className='my-auto'>
                      <Link to={`/product/${item._id}`}>
                        <Image src={item.image} alt={item.name} rounded fluid />
                      </Link>
                    </Col>
                    <Col lg='9' md='7' sm='8' xs='7' className='my-auto '>
                      <Row>
                        <Col
                          lg='6'
                          md='15'
                          sm='12'
                          xs='12'
                          className='my-auto py-2 text-justify'
                        >
                          <Link
                            to={`/product/${item._id}`}
                            className='text-decoration-none'
                          >
                            <h4>
                              <strong>{item.name}</strong>
                            </h4>
                          </Link>
                        </Col>
                        <Col
                          lg='4'
                          md='7'
                          sm='8'
                          xs='8'
                          className='my-auto text-center'
                        >
                          <h5>
                            Price : <strong>₹ {item.price}</strong>
                          </h5>
                        </Col>
                        <Col
                          lg='1'
                          md='2'
                          sm='2'
                          xs='2'
                          className='my-auto px-0 text-center'
                        >
                          <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item._id, Number(e.target.value))
                              )
                            }
                            className='py-2 m-0 px-2'
                          >
                            {[...Array(item.countinStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg='1' md='1' sm='1' xs='1' className='my-auto'>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removefromCartHandler(item._id)}
                        className='p-0 m-1'
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col lg='3' md='4'>
            <Card>
              <ListGroup variant='flush' className='py-3 text-center '>
                <ListGroup.Item className='my-2 '>
                  <h6 className='p-0 m-0'>
                    Total Items :{' '}
                    <strong>
                      {cartList.reduce((acc, item) => acc + item.qty, 0)}
                    </strong>
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5 className='p-0 m-0'>
                    Total Price : ₹{' '}
                    <strong>
                      {cartList.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )}
                    </strong>{' '}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='Button'
                    className='btn-success'
                    disabled={cartList.length === 0}
                    onClick={checkoutHandler}
                  >
                    <p>Proceed to Check Out</p>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartScreen
