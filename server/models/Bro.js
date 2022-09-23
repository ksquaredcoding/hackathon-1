import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const HaterSchema = new Schema(
  {
    memeId: { type: ObjectId, ref: 'Meme', required: true },
    broId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

HaterSchema.virtual('bro', {
  localField: 'broId',
  justOne: true,
  foreignField: '_id',
  ref: 'Account'
})

HaterSchema.virtual('meme', {
  localField: 'memeId',
  foreignField: '_id',
  justOne: true,
  ref: 'Meme'
})