import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const BroSchema = new Schema(
  {
    memeId: { type: ObjectId, ref: 'Meme', required: true },
    broId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BroSchema.virtual('bro', {
  localField: 'broId',
  justOne: true,
  foreignField: '_id',
  ref: 'Account'
})

BroSchema.virtual('meme', {
  localField: 'memeId',
  foreignField: '_id',
  justOne: true,
  ref: 'Meme'
})

export const CommentBroSchema = new Schema(
  {
    commentId: { type: ObjectId, ref: 'Meme', required: true },
    commentBroId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentBroSchema.virtual('comment', {
  localField: 'commentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Comment'
})

CommentBroSchema.virtual('commentBro', {
  localField: 'commentBroId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})