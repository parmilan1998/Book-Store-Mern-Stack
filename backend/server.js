import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import mongoose from 'mongoose'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'

dotenv.config()

// Initialize the Express Application
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Middleware
app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/upload', uploadRoutes)

// Paypal API
app.get('/api/config/paypal', (req, res) =>
  res.send(
    'AaJM4Kxb8pCNgBg3vf0cgJMZvnxaRjYD85cl_MQdlXUPWf9dPuuTkcUj7Y6KRPbGU4-rw1MkQDLXjH1p'
  )
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// Error handler
app.use(notFound)
app.use(errorHandler)

// Set the port
const PORT = process.env.PORT || 5000

// MongoDB connection
mongoose
  .connect(
    `MONGODB URL`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `DB connected succcesfully and listening port ${PORT}`.yellow.bold
      )
    })
  })
  .catch((error) => console.log(error))
