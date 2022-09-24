import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const HaterSchema = new Schema(
  {
    memeId: { type: ObjectId, ref: 'Meme', required: true },
    haterId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

HaterSchema.virtual('hater', {
  localField: 'haterId',
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

export const CommentHaterSchema = new Schema(
  {
    commentId: { type: ObjectId, ref: 'Meme', required: true },
    commentHaterId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentHaterSchema.virtual('comment', {
  localField: 'commentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Comment'
})

CommentHaterSchema.virtual('commentHater', {
  localField: 'commentHaterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentHaterSchema.index({ commentHaterId: 1, commentId: 1 }, { unique: true })
HaterSchema.index({ haterId: 1, memeId: 1 }, { unique: true })