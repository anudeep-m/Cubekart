import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import Loader from '../../components/loader'
import { getUserDetails, updateUserBA } from '../../actions/userActions'
import FormContainer from '../../components/formcontainer'
import { USER_UPDATE_BA_RESET } from '../../constants/allConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_BA_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [history, dispatch, user, userId, successUpdate])

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(
      updateUserBA({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    )
  }
  return (
    <>
      <Link className='btn btn-primary m-4' to='/admin/userlist'>
        Go Back{' '}
      </Link>
      <h2 className='text-center py-2'>Edit User </h2>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

            <Form.Group controlId='isAdmin' className='my-2'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2 mx-auto'>
              {' '}
              Update{' '}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
