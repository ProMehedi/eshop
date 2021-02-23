import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import colors from 'colors'

const app = express()

// Execute dotenv
dotenv.config()

// Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// Define Variables
const api = process.env.API_URL
const port = process.env.PORT ? process.env.PORT : 5000

// Get All Products
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'Product Name',
    image: 'image_url',
  }

  res.send(product)
})

// App New Product
app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body
  res.send(newProduct)
})

// Connect with MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected to ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error.red.underline.bold)
  }
}
connectDB()

// Start the server
app.listen(port, () => {
  console.log(
    `Server is running at http://localhost:${port}`.green.underline.bold
  )
})
