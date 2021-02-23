import express from 'express'
import { Category } from '../models/categoryModel.js'

const categoryRouters = express.Router()

// Get All Categories
categoryRouters.get('/', async (req, res) => {
  const categoryList = await Category.find()

  if (!categoryList) {
    res.status(500).json({ success: false, message: 'No Category Found!' })
  } else {
    res.status(201).json(categoryList)
  }
})

// Get A Category
categoryRouters.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(500).json({
      success: false,
      message: 'The Category with the given id was not Found!',
    })
  } else {
    res.status(201).json(category)
  }
})

// Add New Category
categoryRouters.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  })
  const updatedCategroy = await category.save()

  if (!updatedCategroy) {
    return res
      .status(404)
      .send({ success: false, message: "This category can't be created!" })
  } else {
    res.status(201).json(updatedCategroy)
  }
})

// Update A Category
categoryRouters.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  )

  if (!category) {
    res
      .status(500)
      .json({ success: false, message: "This category can't be update!" })
  } else {
    res.status(201).json(category)
  }
})

// Delete a Category
categoryRouters.delete('/:id', async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id)

  if (category) {
    res.status(201).json({ success: true, message: 'Category Deleted!' })
  } else {
    res
      .status(500)
      .json({ success: false, message: "The Category can't be Delete!" })
  }
})

export default categoryRouters
