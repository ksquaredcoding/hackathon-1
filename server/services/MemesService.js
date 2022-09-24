import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class MemesService {
  async deleteMeme(memeId, userInfo) {
    const meme = await this.getMemeById(memeId)
    if (userInfo.id != meme.creatorId.toString()) { throw new Forbidden("That ain't your meme!") }
    await meme.remove()
    return meme
  }
  async makeMeme(formData) {
    const madeMeme = await dbContext.Memes.create(formData)
    return madeMeme
  }
  async getMemeById(memeId) {
    const meme = await dbContext.Memes.findById(memeId).populate('creator', 'name picture').populate('haters').populate('bros')
    if (!meme) { throw new BadRequest('There is no such meme... Bad ID') }
    return meme
  }
  async getAllMemes() {
    const memes = await dbContext.Memes.find().populate('creator', 'name picture').populate('haters').populate('bros')
    return memes
  }

  async memesByDate() {
    const sortedMemes = await dbContext.Memes.find().sort({ createdAt: -1 }).slice(0)
    return sortedMemes
  }

}

export const memesService = new MemesService()