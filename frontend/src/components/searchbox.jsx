import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push(`/`)
    }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <div xs='0' sm='8' md='12' className='d-flex mx-0'>
        <Col xs='0' sm='8' md='10'>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products...'
            className='mx-0 px-1'
          ></Form.Control>
        </Col>
        <Col xs='2' sm='4' md='2'>
          <button type='submit' className='px-2 mx-2 btn btn-outline-success'>
            Search
          </button>
        </Col>
      </div>
    </Form>
  )
}

export default SearchBox
