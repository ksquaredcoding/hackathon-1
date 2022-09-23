import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class InteractionsService {
  async broComment(formData) {
    const bro = await dbContext.CommentBros.create(formData)
    await bro.populate('comment')
    await bro.populate('commentBro', 'name')
    return bro
  }
  async hateComment(formData) {
    const hater = await dbContext.CommentHaters.create(formData)
    await hater.populate('comment')
    await hater.populate('commentHater', 'name')
    return hater
  }
  async deleteComment(commentId, userInfo) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) { throw new BadRequest("You can't delete comments that don't exist...") }
    if (userInfo.id != comment.commenterId.toString()) {
      throw new Forbidden("That ain't your comment!")
    }
    await comment.remove()
    return comment
  }
  async addComment(formData) {
    const comment = await dbContext.Comments.create(formData)
    await comment.populate('meme')
    return comment
  }
  async getComments(query = {}) {
    const comments = await dbContext.Comments.find(query)
      .populate('meme').populate('commentHaters').populate('commentBros')
    return comments
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