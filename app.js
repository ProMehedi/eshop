import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
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

// Product Model
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    default: 0,
  },
})

const Product = mongoose.model('Product', productSchema)

// Get All Products
app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find()

  if (!productList) {
    res.status(500).json({ success: false, message: 'No Product Found!' })
  } else {
    res.status(201).json(productList)
  }
})

// App New Product
app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  })

  // Save to MongoDB
  product
    .save()
    .then((createdPorudct) => {
      res.status(201).json(createdPorudct)
    })
    .catch((error) => {
      res.status(500).json({
        error,
        succuss: false,
      })
    })
})

// Connect with MongoDB
connectDB()

// Start the server
app.listen(port, () => {
  console.log(
    `Server is running at http://localhost:${port}`.green.underline.bold
  )
})
