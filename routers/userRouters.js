import express from 'express'
import { User } from '../models/userModel.js'

const userRouters = express.Router()

// Get All Products
userRouters.get('/', async (req, res) => {
  const userList = await User.find()

  if (!userList) {
    res.status(500).json({ success: false, message: 'No User Found!' })
  } else {
    res.status(201).json(userList)
  }
})

export default userRouters
