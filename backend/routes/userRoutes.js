import express from 'express'
import {validateSignupRequest, isRequestValidated, validateSigninRequest } from '../validators/auth.js'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect,  systemAdmin ,} from '../middleware/authMiddleware.js'

router.route('/').post(validateSignupRequest,registerUser, isRequestValidated).get(protect, systemAdmin, getUsers)
router.post('/login',validateSigninRequest, isRequestValidated, authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect,updateUserProfile)
router
  .route('/:id')
  .delete(protect, systemAdmin, deleteUser)
  .get(protect, systemAdmin, getUserById)
  .put(protect, systemAdmin, updateUser)

export default router
