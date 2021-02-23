import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    default: 0,
  },
})

export const User = mongoose.model('User', userSchema)
