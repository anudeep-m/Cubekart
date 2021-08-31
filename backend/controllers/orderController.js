import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//Create new order
// route - POST /api/Orders
// access - Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    deliveryCharges,
    totalPrice,
  } = req.body

  if (!orderItems && orderItems.length === 0) {
    ReadableStream.status(400)
    throw new Error('No Order Items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      deliveryCharges,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

//Get Order by ID
// route - GET /api/orders/:id
// access - Private
const getOrderbyId = asyncHandler(async (req, res) => {
  // const order = await Order.findById(req.params.id)
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

//Update Order to Paid
// route - GET /api/orders/:id/paid
// access - Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()

    //For PayPal Payment
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

//Get logged-in User Orders
// route - GET/api/orders/myorders
// access - Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

export { addOrderItems, getOrderbyId, getMyOrders, updateOrderToPaid }
