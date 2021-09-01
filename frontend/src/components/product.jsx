import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './loader'
import Rating from './rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        {!product.image ? (
          <Loader />
        ) : (
          <Card.Img src={product.image} variant='top' />
        )}
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div' className='text-center'>
            <h4 className='productcardname'>{product.name}</h4>
          </Card.Title>
        </Link>

        <Card.Text as='div' className='text-center'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h5' className='text-center mt-3'>
          <strong>₹ {product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
