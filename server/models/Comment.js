import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CommentSchema = new Schema(
  {
    contents: { type: String, required: true, maxlength: 200 },
    commenterId: { type: ObjectId, ref: 'Account', required: true },
    memeId: { type: ObjectId, ref: 'Meme', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('commenter', {
  localField: 'commenterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentSchema.virtual('memeComment', {
  localField: 'memeId',
  foreignField: '_id',
  justOne: true,
  ref: 'Meme'
})

CommentSchema.virtual('commentHater', {
  localField: '_id',
  foreignField: 'commentId',
  count: true,
  ref: 'Hater'
})

CommentSchema.virtual('commentBro', {
  localField: '_id',
  foreignField: 'commentId',
  count: true,
  ref: 'Bro'
})