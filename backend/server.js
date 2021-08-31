import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import path from 'path'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

//Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

//Middleware
app.use(notFound)
app.use(errorHandler)

// const __dirname = path.resolve()

// //Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....')
//   })
// }
const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
