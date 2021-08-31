import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartActions'
import FormContainer from '../../components/formcontainer'
import CheckOutSteps from '../../components/checkoutsteps'
import GpayImage from '../../pictures/gpay.png'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Google Pay')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h2 className='text-center py-2'>Payment</h2>
      <Form onSubmit={submitHandler} className='d-flex flex-column'>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Row>
            <Col className='d-flex'>
              <Form.Check
                type='radio'
                label=''
                id='Google Pay'
                name='paymentMethod'
                value='Google Pay'
                checked
                className='my-4'
                onChange={(e) => {
                  setPaymentMethod(e.target.value)
                }}
              ></Form.Check>
              <img
                src={GpayImage}
                alt='Gpay'
                className='my-3'
                style={{ height: 40, width: 70 }}
              />
            </Col>
            {/* 
            <Form.Check
              type='radio'
              label='Net Banking'
              id='NetBanking'
              name='paymentMethod'
              value='NetBanking'
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
            ></Form.Check>

            <Form.Check
              type='radio'
              label='UPI'
              id='UPI'
              name='paymentMethod'
              value='UPI'
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
            ></Form.Check> */}
          </Row>
        </Form.Group>
        <Button type='submit' variant='success'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
