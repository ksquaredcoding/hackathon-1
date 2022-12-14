import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class InteractionsService {
  async removedHate(hateId, userInfo) {
    // const hater = await dbContext.Haters.filter(h => h.id == userInfo.id)
    const removedHate = await dbContext.Haters.findById(hateId)
    if (!removedHate) { throw new BadRequest('This Hate doesnt exist...') }
    if (userInfo.id !== removedHate.haterId.toString()) {
      throw new Forbidden("This isn't your hate!!")
    }
    await removedHate.remove()
    return removedHate
  }
  async removedBro(brroId, userInfo) {
    const removedBro = await dbContext.Bros.findById(brroId)
    if (!removedBro) { throw new BadRequest('This Bro doesnt exist...') }
    if (userInfo.id !== removedBro.broId.toString()) { throw new Forbidden("Yo this isnt for you to unBro!") }
    await removedBro.remove()
    return removedBro
  }

  async deleteCommentBro(commentBroId, userInfo) {
    const deletedBro = await dbContext.CommentBros.findById(commentBroId)
    if (!deletedBro) { throw new BadRequest("Can't stop liking what isnt there") }
    if (userInfo.id != deletedBro.commentBroId.toString()) {
      throw new Forbidden("You didnt like this comment!!")
    }
    await deletedBro.remove()
    return deletedBro
  }
  async deleteCommentHate(commentHateId, userInfo) {
    const deletedHate = await dbContext.CommentHaters.findById(commentHateId)
    if (!deletedHate) { throw new BadRequest("Can't Stop Hating what isnt there") }
    if (userInfo.id != deletedHate.commentHaterId.toString()) {
      throw new Forbidden("You didnt hate this comment!!")
    }
    await deletedHate.remove()
    return deletedHate
  }
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
  async addComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('memeComment')
    await comment.populate('commenter', 'name')
    return comment
  }
  async getComments() {
    const comments = await dbContext.Comments.find()
      .populate('memeComment').populate('commentHaters').populate('commentBros')
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