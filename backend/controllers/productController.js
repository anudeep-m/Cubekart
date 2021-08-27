import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//GET all products
// route - GET /api/products
// access - Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//GET single product by ID
// route - GET /api/products/id
// access - Public
const getProductbyID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

export { getProducts, getProductbyID }
