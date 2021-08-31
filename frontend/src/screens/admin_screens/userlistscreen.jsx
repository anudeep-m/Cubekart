import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { deleteUserBA, getUserListBA } from '../../actions/userActions'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserListBA())
    } else {
      history.push('/login')
    }
  }, [history, userInfo, dispatch, successDelete])

  const deleteUserHandler = (userId) => {
    if (window.confirm('Are you sure? ')) {
      dispatch(deleteUserBA(userId))
    }
  }

  return (
    <>
      <h2 className='text-center py-2'>Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key='user._id'>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a
                    href={`mailto:${user.email}`}
                    className='text-decoration-none'
                  >
                    {user.email}{' '}
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className='btn-sm mx-1' variant='light'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm mx-1'
                    variant='danger'
                    onClick={() => deleteUserHandler(user._id)}
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

export default UserListScreen
