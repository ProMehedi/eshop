import express from 'express'
import { Category } from '../models/categoryModel.js'
import { Product } from '../models/productModel.js'

const productRouters = express.Router()

// Get All Products
productRouters.get('/', async (req, res) => {
  const productList = await Product.find().populate('category')

  if (!productList) {
    return res
      .status(404)
      .send({ success: false, message: 'No Product Found!' })
  } else {
    res.status(201).json(productList)
  }
})

// Get A Product
productRouters.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category')

  if (product) {
    res.json(product)
  } else {
    res.status(404).send({ success: false, message: 'Product Not Found!' })
  }
})

// Add New Product
productRouters.post('/', async (req, res) => {
  const category = await Category.findById(req.body.category)
  if (!category) {
    res.status(400).send('Invalid Cateogry')
  }

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  })

  // Save to MongoDB
  const updatedProduct = await product.save()

  if (!updatedProduct) {
    res.status(400).send("This product can't be created!")
  } else {
    res.status(201).send(updatedProduct)
  }
})

export default productRouters
