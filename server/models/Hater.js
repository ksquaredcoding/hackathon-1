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

export const CommentHater = new Schema(
  {
    commentId: { type: ObjectId, ref: 'Meme', required: true },
    commentHaterId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentHater.virtual('comment', {
  localField: 'commentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Comment'
})

CommentHater.virtual('commentHater', {
  localField: 'commentHaterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})