import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import CheckOutSteps from '../../components/checkoutsteps'
import { createOrder } from '../../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  cart.itemsPrice = cart.cartList.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.deliveryCharges = cart.itemsPrice >= 3000 ? 0 : 40
  cart.totalPrice = cart.itemsPrice + cart.deliveryCharges
  const dispatch = useDispatch()

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartList,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        deliveryCharges: cart.deliveryCharges,
        totalPrice: cart.itemsPrice,
      })
    )
  }

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <h2 className='text-center py-2'>Place Order</h2>

      <Row>
        <Col md='8'>
          <ListGroup variant='flush'>
            <ListGroup.Item className='my-2'>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className='my-2'>
              <h2>Payement Method</h2>
              <p>
                <strong> Payment Mode: </strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartList.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartList.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md='1'>
                          <Link
                            to={`/product/${item._id}`}
                            className='text-decoration-none'
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Link>
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item._id}`}
                            className='text-decoration-none'
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          {item.qty} x ₹ {item.price} = ₹{' '}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md='4'>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2 className='text-center'>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Delivery Charges</Col>
                  <Col>₹ {cart.deliveryCharges}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && <Message variant='danger'>{error}</Message>}

              <ListGroup.Item className='text-center'>
                <Button
                  type='button'
                  className='btn-md text-center btn-success'
                  disabled={cart.cartList.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
