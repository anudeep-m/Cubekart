import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { getOrderDetails, payOrder } from '../../actions/orderActions'
import BWGpayImage from '../../pictures/buywithgpay.png'
import { ORDER_PAY_RESET } from '../../constants/allConstants'

const OrderScreen = ({ match }) => {
  const orderID = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  useEffect(() => {
    dispatch({ type: ORDER_PAY_RESET })
    if (!order || order._id !== orderID || successPay) {
      dispatch(getOrderDetails(orderID))
    }
  }, [dispatch, order, orderID, successPay])

  const successPaymentHandler = () => {
    const paymentResult = {
      status: 'COMPLETED',
      update_time: Date().toLocaleString(),
      id: 'paid12345679',
      email_address: order.user.email,
    }
    dispatch(payOrder(orderID, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md='8'>
          <ListGroup variant='flush'>
            <ListGroup.Item className='my-2'>
              <h2 className='mb-3'>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a
                  className='text-decoration-none'
                  href={`mailto:${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </p>

              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered On {order.deliveredAt}
                </Message>
              ) : order.isPaid ? (
                <Message variant='warning'>
                  Your order will be delivered in a week
                </Message>
              ) : (
                <Message variant='danger'> Not delivered </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className='my-2'>
              <h2>Payement Method</h2>
              <p>
                <strong> Payment Mode: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid On {order.paidAt}</Message>
              ) : (
                <Message variant='danger'> Not paid </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, idx) => (
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
                  <Col>₹ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Delivery Charges</Col>
                  <Col>₹ {order.deliveryCharges}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item className='text-center gpayimage'>
                  {loadingPay && <Loader />}
                  <Button
                    onClick={successPaymentHandler}
                    className='p-0 btn-secondary '
                  >
                    <Image src={BWGpayImage} alt='Gpay' fluid />
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
