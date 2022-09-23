import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentBroSchema } from "../models/Bro.js";
import { CommentSchema } from "../models/Comment.js";
import { CommentHaterSchema, HaterSchema } from "../models/Hater.js";
import { MemeSchema } from "../models/Meme.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Memes = mongoose.model('Meme', MemeSchema);
  Haters = mongoose.model('Hater', HaterSchema);
  Bros = mongoose.model('Bro', HaterSchema);
  Comments = mongoose.model('Comment', CommentSchema);
  CommentHaters = mongoose.model('Hater', CommentHaterSchema)
  CommentBros = mongoose.model('Bro', CommentBroSchema)
}

export const dbContext = new DbContext()
