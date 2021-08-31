import express from 'express'
const router = express.Router()
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getAllUsersforAdmin,
  deleteUser,
  getUserById,
  updateUserById,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getAllUsersforAdmin)

router.post('/login', authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById)

export default router
