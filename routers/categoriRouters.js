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

export default categoryRouters
