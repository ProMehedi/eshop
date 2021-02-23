import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    default: 0,
  },
})

export const Product = mongoose.model('Product', productSchema)
