import express from 'express'
import asyncHandler from 'express-async-handler'
import { Category } from '../models/categoryModel.js'
import { Product } from '../models/productModel.js'

const productRouters = express.Router()

// @desc    Fetch All Products
// @route   GET /api/v1/products
// @access  Public
productRouters.get(
  '/',
  asyncHandler(async (req, res) => {
    const productList = await Product.find().populate('category')

    if (productList) {
      res.status(201).json(productList)
    } else {
      res.status(404)
      throw new Error('Product Not Found!')
    }
  })
)

// @desc    Fetch A Products
// @route   GET /api/v1/products/:id
// @access  Public
productRouters.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category')

    if (product) {
      res.status(201).json(product)
    } else {
      res.status(404)
      throw new Error('Product Not Found!')
    }
  })
)

// @desc    Add New Product
// @route   POST /api/v1/products/
// @access  Private
productRouters.post(
  '/',
  asyncHandler(async (req, res) => {
    // Validate The Cateogy
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

    if (updatedProduct) {
      res.status(201).send(updatedProduct)
    } else {
      res.status(400)
      throw new Error("The Product can't be update!")
    }
  })
)

// @desc    Update A Product
// @route   PUT /api/v1/products/:id
// @access  Private
productRouters.put(
  '/:id',
  asyncHandler(async (req, res) => {
    // Validate The Cateogy
    const category = await Category.findById(req.body.category)
    if (!category) {
      res.status(400).send('Invalid Cateogry')
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      { new: true }
    )

    if (product) {
      res.status(201).json(product)
    } else {
      res.status(500)
      throw new Error("The Product can't be update!")
    }
  })
)

// @desc    Delete A Product
// @route   DELETE /api/v1/products/:id
// @access  Private
productRouters.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id)

    if (product) {
      res.status(201).json({ success: true, message: 'Product Deleted!' })
    } else {
      res.status(500)
      throw new Error("The Product can't be Delete!")
    }
  })
)

export default productRouters
