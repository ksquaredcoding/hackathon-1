import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const MemeSchema = new Schema(
  {
    image: { type: String, required: true },
    description: { type: String, required: true, maxlength: 100 },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

MemeSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

MemeSchema.virtual('haters', {
  count: true,
  ref: 'Hater',
  localField: '_id',
  foreignField: 'memeId'
})

MemeSchema.virtual('bros', {
  count: true,
  ref: 'Bro',
  localField: '_id',
  foreignField: 'memeId'
})