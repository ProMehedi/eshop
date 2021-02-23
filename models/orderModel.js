import mongoose from 'mongoose'

const orDerSchema = mongoose.Schema(
  {
    name: String,
    image: String,
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export const Order = mongoose.model('Order', orDerSchema)
