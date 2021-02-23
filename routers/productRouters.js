import express from 'express'
import { Product } from '../models/productModel.js'

const productRouters = express.Router()

// Get All Products
productRouters.get('/', async (req, res) => {
  const productList = await Product.find()

  if (!productList) {
    res.status(500).json({ success: false, message: 'No Product Found!' })
  } else {
    res.status(201).json(productList)
  }
})

// App New Product
productRouters.post('/', (req, res) => {
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

export default productRouters
