import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  getProducts,
  getProductbyID,
  deleteProduct,
  addProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'

router.route('/').get(getProducts).post(protect, admin, addProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)

router
  .route('/:id')
  .get(getProductbyID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
