import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToPaidCash,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder,
  updateShow,
} from '../controllers/orderController.js'
import { protect, systemAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, systemAdmin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id').delete(protect, deleteOrder)
router.route('/:id/show').put(protect, updateShow)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/paycash').put(protect,systemAdmin, updateOrderToPaidCash)
router.route('/:id/deliver').put(protect, systemAdmin, updateOrderToDelivered)

export default router
