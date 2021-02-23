import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    default: 0,
  },
})

export const Category = mongoose.model('Category', categorySchema)
