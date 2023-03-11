import mongoose from 'mongoose'


const feedbackSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
 
    bookName: {
      type: String,
     
    },
    authorName: {
      type: String,
    
    },
    image: {
      type: String,
      
    },
    feedback: {
      type: String,
     
    },
  },
  {
    timestamps: true,
  }
)

const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback
