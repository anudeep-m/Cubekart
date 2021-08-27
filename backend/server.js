import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import path from 'path'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

//Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//Middleware
app.use(notFound)
app.use(errorHandler)

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set Static Folder
  app.use(express.static('frontend/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}
const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
