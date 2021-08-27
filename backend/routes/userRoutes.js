import express from 'express'
import User from '../models/userModel.js'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import {
  registerUser,
  authUser,
  getUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

// //GET all users
// // route - GET /api/users
// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const users = await User.find({})
//     res.json(users)
//   })
// )

// //GET admin
// // route - GET /api/users/admin
// router.get(
//   '/admin',
//   asyncHandler(async (req, res) => {
//     const admin = await User.find({ isAdmin: true })
//     res.json(admin)
//   })
// )

// //GET all customers
// // route - GET /api/users/customers
// router.get(
//   '/customers',
//   asyncHandler(async (req, res) => {
//     const customers = await User.find({ isAdmin: false })
//     res.json(customers)
//   })
// )

// //GET single customer by id
// // route - GET /api/users/customers/id
// router.get(
//   '/customers/:id',
//   asyncHandler(async (req, res) => {
//     const customer = await User.findById(req.params.id)
//     res.json(customer)
//   })
// )

// //Make/Remove an user as admin
// // route - POST/api/users/customers
// router.patch(
//   '/customers/toggleadmin/:id',
//   asyncHandler(async (req, res) => {
//     const toggle_admin = await User.findById(req.params.id)

//     if (toggle_admin.isAdmin === true) toggle_admin.isAdmin = false
//     else toggle_admin.isAdmin = true

//     const a1 = await toggle_admin.save()
//     res.json(a1)
//   })
// )

export default router
