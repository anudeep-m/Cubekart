import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

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
      <Row md='20'>
        <Col md='8'>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products...'
            className='mr-sm-2 mr-md-5'
          ></Form.Control>
        </Col>
        <Col>
          <button type='submit' className='btn btn-outline-success'>
            Search
          </button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBox
