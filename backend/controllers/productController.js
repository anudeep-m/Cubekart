import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//GET all products
// route - GET /api/products
// access - Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pagenumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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
    name: 'Sample Name',
    image: '/pictures/sample.png',
    price: 0,
    countinStock: 0,
    size: 'Sample Size',
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
  const { name, brand, image, price, countinStock, size } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.brand = brand
    product.image = image
    product.price = price
    product.countinStock = countinStock
    product.size = size

    const updatedProduct = await product.save()

    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

//Product Review
// route - POST /api/products/:id/reviews
// access - Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product Already Reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.status(201).json({ message: 'reviewAdded' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

//Get top rated products
// route - GET /api/products/top
// access - Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4)
  res.json(products)
})

export {
  getProducts,
  getProductbyID,
  getTopProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
}
