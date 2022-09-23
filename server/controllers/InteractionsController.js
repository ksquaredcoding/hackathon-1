import { interactionsService } from "../services/InteractionsService.js"
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider';
import { BadRequest } from "../utils/Errors.js";

export class InteractionsController extends BaseController {
  constructor() {
    super('/api/interactions')
    this.router
      .get('/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/haters', this.beHatin)
      .post('/bros', this.beABro)
      .post('/comments', this.addComment)
      .post('/comments/commenthaters', this.hateComment)
      .post('/comments/commentbros', this.broComment)
      .get('/haters', this.getHaters)
      .get('/bros', this.getBros)
      .delete('/comments/:commentId', this.deleteComment)
      .delete('/comments')
  }
  async broComment(req, res, next) {
    try {
      const formData = {
        commentBroId: req.userInfo.id,
        commentId: req.body.commentId
      }
      const commentBro = await interactionsService.broComment(formData)
      res.send(commentBro)
    } catch (error) {
      next(error)
    }
  }
  async hateComment(req, res, next) {
    try {
      const formData = {
        commentHaterId: req.userInfo.id,
        commentId: req.body.commentId
      }
      const commentHater = await interactionsService.hateComment(formData)
      res.send(commentHater)
    } catch (error) {
      next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
      const deletedComment = await interactionsService.deleteComment(req.params.commentId, req.userInfo)
      res.send(deletedComment)
    } catch (error) {
      next(error)
    }
  }
  async addComment(req, res, next) {
    try {
      const formData = {
        commenterId: req.userInfo.id,
        memeId: req.body.memeId
      }
      const comment = await interactionsService.addComment(formData)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async getComments(req, res, next) {
    try {
      if (!req.query.memeId) {
        throw new BadRequest("You need a meme to see haters")
      }
      const comments = await interactionsService.getComments(req.query)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async beHatin(req, res, next) {
    try {
      const formData = {
        haterId: req.userInfo.id,
        memeId: req.body.memeId
      }
      const hater = await interactionsService.beHatin(formData)
      res.send(hater)
    } catch (error) {
      next(error)
    }
  }
  async getHaters(req, res, next) {
    try {
      if (!req.query.memeId) {
        throw new BadRequest("You need a meme to see haters")
      }
      const haters = await interactionsService.getHaters(req.query)
      res.send(haters)
    } catch (error) {
      next(error)
    }
  }
  async beABro(req, res, next) {
    try {
      const formData = {
        broId: req.userInfo.id,
        memeId: req.body.memeId
      }
      const bro = await interactionsService.beABro(formData)
      res.send(bro)
    } catch (error) {
      next(error)
    }
  }
  async getBros(req, res, next) {
    try {
      if (!req.query.memeId) {
        throw new BadRequest("You need a meme to see haters")
      }
      const bros = await interactionsService.getBros(req.query)
      res.send(bros)
    } catch (error) {
      next(error)
    }
  }
}