import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class MemesService {
  async beABro(formData) {
    const bro = await dbContext.Bros.create(formData)
    await bro.populate('meme')
    await bro.populate('bro', 'name')
    return bro
  }
  async getBros(query = {}) {
    const bros = await dbContext.Bros.find(query)
      .populate('meme').populate('bro', 'name')
    return bros
  }
  async getHaters(query = {}) {
    const haters = await dbContext.Haters.find(query)
      .populate('meme').populate('hater', 'name')
    return haters
  }
  async beHatin(formData) {
    const hater = await dbContext.Haters.create(formData)
    await hater.populate('meme')
    await hater.populate('hater', 'name')
    return hater
  }
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
    const meme = await dbContext.Memes.findById(memeId).populate('creator', 'name picture').populate('haters').populate('bros')
    if (!meme) { throw new BadRequest('There is no such meme... Bad ID') }
    return meme
  }
  async getAllMemes() {
    const memes = await dbContext.Memes.find().populate('creator', 'name picture').populate('haters').populate('bros')
    return memes
  }

}

export const memesService = new MemesService()