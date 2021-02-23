import express from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel.js'

const userRouters = express.Router()

// @desc    Fetch All Users
// @route   GET /api/v1/users
// @access  Public
userRouters.get(
  '/',
  asyncHandler(async (req, res) => {
    const userList = await User.find()

    if (userList) {
      res.status(201).json(userList)
    } else {
      res.status(404)
      throw new Error('No User Found!')
    }
  })
)

// @desc    Fetch A User
// @route   GET /api/v1/users/:id
// @access  Public
userRouters.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
      res.status(201).json(user)
    } else {
      res.status(500)
      throw new Error('The User with the given id was not Found!')
    }
  })
)

// @desc    Add New User
// @route   POST /api/v1/users/
// @access  Private
userRouters.post(
  '/',
  asyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    })
    const updatedUser = await user.save()

    if (updatedUser) {
      res.status(201).json(updatedUser)
    } else {
      res.status(500)
      throw new Error("This User can't be created!")
    }
  })
)

export default userRouters
