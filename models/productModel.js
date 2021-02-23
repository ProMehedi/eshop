import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    richDescription: { type: String, default: '' },
    image: { type: String, default: '' },
    images: [{ type: String }],
    brand: { type: String, default: '' },
    price: { type: Number, default: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    countInStock: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Duplicate the ID field.
productSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
productSchema.set('toJSON', { virtuals: true })

export const Product = mongoose.model('Product', productSchema)
