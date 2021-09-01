import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { listallOrdersBA } from '../../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listallOrdersBA())
    } else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch])

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

  return (
    <>
      <h2 className='text-center py-2'>Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ADDRESS</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={`${order._id}`}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>

                <td>{datecutter(order.createdAt)}</td>

                <td>₹ {order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    datecutter(order.paidAt)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    datecutter(order.deliveredAt)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
