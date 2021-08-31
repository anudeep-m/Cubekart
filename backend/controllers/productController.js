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

//Add Sample Product
// route - PUT /api/products/id
// access - Private/Admin
const addProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    brand: 'Sample Brand',
    model_no: '123',
    name: 'Sample Name',
    image: '/pictures/prod1.png',
    price: 0,
    countinStock: 0,
    size: 'Sample Size',
    width: 0,
    dimensions: '00-00-000',
    colour: 'Sample Colour',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//Delete Product
// route - DELETE /api/products/id
// access - Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

//Edit Product Details
// route - PUT /api/products/id
// access - Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    model_no,
    image,
    price,
    countinStock,
    size,
    width,
    dimensions,
    colour,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.brand = brand
    product.model_no = model_no
    product.image = image
    product.price = price
    product.countinStock = countinStock
    product.size = size
    product.width = width
    product.dimensions = dimensions
    product.colour = colour

    const updatedProduct = await product.save()

    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

export { getProducts, getProductbyID, addProduct, deleteProduct, updateProduct }
