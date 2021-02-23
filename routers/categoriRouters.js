import express from 'express'
import asyncHandler from 'express-async-handler'
import { Category } from '../models/categoryModel.js'

const categoryRouters = express.Router()

// @desc    Fetch All Categories
// @route   POST /api/v1/categories/
// @access  Public
categoryRouters.get(
  '/',
  asyncHandler(async (req, res) => {
    const categoryList = await Category.find()

    if (categoryList) {
      res.status(201).json(categoryList)
    } else {
      res.status(404)
      throw new Error('No Category Found!')
    }
  })
)

// @desc    Fetch A Category
// @route   GET /api/v1/categories/:id
// @access  Public
categoryRouters.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (category) {
      res.status(201).json(category)
    } else {
      res.status(500)
      throw new Error('The Category with the given id was not Found!')
    }
  })
)

// @desc    Add New Category
// @route   POST /api/v1/categories/
// @access  Private
categoryRouters.post(
  '/',
  asyncHandler(async (req, res) => {
    const category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    })
    const updatedCategroy = await category.save()

    if (updatedCategroy) {
      res.status(201).json(updatedCategroy)
    } else {
      res.status(500)
      throw new Error("This category can't be created!")
    }
  })
)

// @desc    Update A Category
// @route   PUT /api/v1/categories/:id
// @access  Private
categoryRouters.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      },
      { new: true }
    )

    if (category) {
      res.status(201).json(category)
    } else {
      res.status(500)
      throw new Error("This category can't be update!")
    }
  })
)

// @desc    Delete A Category
// @route   DELETE /api/v1/categories/:id
// @access  Private
categoryRouters.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id)

    if (category) {
      res.status(201).json({ success: true, message: 'Category Deleted!' })
    } else {
      res.status(500)
      throw new Error("This category can't be Delete!")
    }
  })
)

export default categoryRouters
