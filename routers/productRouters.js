import express from 'express'
import { Product } from '../models/productModel.js'

const productRouters = express.Router()

// Get All Products
productRouters.get('/', async (req, res) => {
  const productList = await Product.find()

  const updatedProductList = await productList.save()

  if (!updatedProductList) {
    return res.status(404).send("This Product can't be created!")
  } else {
    res.status(201).json(updatedProductList)
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
