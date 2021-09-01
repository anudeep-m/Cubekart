import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/allConstants'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

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

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  let { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success: successUpdate } = userUpdateProfile

  const myOrdersList = useSelector((state) => state.myOrdersList)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrdersList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || successUpdate) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, successUpdate])

  const submitHandler = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      event.preventDefault()
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      )
    }
  }
  return (
    <Row>
      <Col md='3'>
        <h2 className='text-center py-2'>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {successUpdate && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className='d-flex flex-column'>
            <Form.Group controlId='name' className='my-2 '>
              <Form.Label className='mx-2'>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2 '>
              <Form.Label className='mx-2'>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-2 '>
              <Form.Label className='mx-2'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-2 '>
              <Form.Label className='mx-2'>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-2 mx-auto'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md='9'>
        <h2 className='text-center py-2'>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : orders.length === 0 ? (
          <Message variant='info'>No Orders </Message>
        ) : (
          <Table striped hover bordered responsive className='table-sm'>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{datecutter(order.createdAt)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      datecutter(order.paidAt)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
