import asyncHandler from 'express-async-handler'
import Feedback from '../models/feedbackModel.js'




const getFeedbackById = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id)

  if (feedback) {
    res.json(feedback)
  } else {
    res.status(404)
    throw new Error('Feedback not found')
  }
})



const createFeedback = asyncHandler(async (req, res) => {
  const {
    bookName,
    authorName,
    image,
    feedback,
   
  }= req.body
  
  const feed = new Feedback({
    user: req.user._id,
    bookName,
    authorName,
    image,
    feedback,
  })
  
  const createdFeedback = await feed.save()
  res.status(201).json(createdFeedback)
})


const getFeedback = asyncHandler(async (req, res) => {
    const feedback = await Feedback.find({}).populate('user', 'id name email')
    res.json(feedback)
  })

export {
  createFeedback,
  getFeedbackById,
  getFeedback,
}
