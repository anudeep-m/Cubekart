import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/product'
import { listProducts } from '../../actions/productActions.js'
import Loader from '../../components/loader'
import Message from '../../components/message'
import Paginate from '../../components/paginate'
import ProductCarousel from '../../components/productcarousel'
import { Link } from 'react-router-dom'
import Meta from '../../components/meta'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pagenumber = match.params.pagenumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pagenumber))
  }, [dispatch, keyword, pagenumber])

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}

      <h2 className='text-center py-3'>Latest Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta />
          <Row className='d-flex justify-content-around'>
            {products.map((product) => (
              <Col key={product._id} xs='10' sm='8' md='5' lg='4' xl='3'>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
