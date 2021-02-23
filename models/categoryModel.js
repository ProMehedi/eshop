import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String },
    color: { type: String },
  },
  { timestamps: true }
)

// Duplicate the ID field.
categorySchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
categorySchema.set('toJSON', { virtuals: true })

export const Category = mongoose.model('Category', categorySchema)
