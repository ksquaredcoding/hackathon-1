import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class MemesService {
  async deleteMeme(memeId, userInfo) {
    const meme = await this.getMemeById(memeId)
    if (meme.creatorId !== userInfo.id) { throw new Forbidden("That ain't your meme!") }
    meme.remove()
    return meme
  }
  async makeMeme(formData) {
    const madeMeme = await dbContext.Memes.create(formData)
    return madeMeme
  }
  async getMemeById(memeId) {
    const meme = await dbContext.Memes.findById(memeId)
    if (!meme) { throw new BadRequest('There is no such meme... Bad ID') }
    return meme
  }
  async getAllMemes() {
    const memes = await dbContext.Memes.find()
    return memes
  }

}

export const memesService = new MemesService()