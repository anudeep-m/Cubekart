import express from 'express'
import {
  addOrderItems,
  getMyOrders,
  getOrderbyId,
  updateOrderToPaid,
} from '../controllers/orderController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderbyId)
router.route('/:id/paid').put(protect, updateOrderToPaid)

export default router
