import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class InteractionsService {
  async getComments(query = {}) {
    // const comments = await dbContext.find
  }
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
}

export const interactionsService = new InteractionsService()