import express from 'express'
const router = express.Router()
import {
    createFeedback,
    getFeedbackById,
    getFeedback,
} from '../controllers/feedbackController.js'
import { protect, systemAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createFeedback).get(protect, systemAdmin, getFeedback)

router
  .route('/:id')
  .get(getFeedbackById)


export default router
