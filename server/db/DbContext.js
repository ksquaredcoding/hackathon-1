import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { MemeSchema } from "../models/Meme.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Memes = mongoose.model('Meme', MemeSchema)
}

export const dbContext = new DbContext()
