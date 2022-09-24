import { interactionsService } from "../services/InteractionsService.js"
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider';
import { BadRequest } from "../utils/Errors.js";

export class InteractionsController extends BaseController {
  constructor() {
    super('/api/interactions/memes')
    this.router
      .get('/comments', this.getComments)
      .get('/bros', this.getBros)
      .get('/haters', this.getHaters)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // SECTION Meme Bro & Hate Requests
      .post('/:memeId/bros', this.beABro)
      .post('/:memeId/haters', this.beHatin)
      .delete('/haters/:hateId', this.removeHate)
      .delete('/bros/:broId', this.removeBro)
      // SECTION Comment Requests
      .post('/comments', this.addComment)
      .delete('/comments/:commentId', this.deleteComment)
      //  STUB Comment Hater&Bro Requests
      .post('/comments/commenthaters', this.hateComment)
      .post('/comments/commentbros', this.broComment)
      .delete('/comments/commenthaters/:commentHateId', this.deleteCommentHate)
      .delete('/comments/commentbros/:commentBroId', this.deleteCommentBro)

  }

  async removeHate(req, res, next) {
    try {
      const removedHate = await interactionsService.removedHate(req.params.hateId, req.userInfo)
      res.send(removedHate)
    } catch (error) {
      next(error)
    }
  }

  async removeBro(req, res, next) {
    try {
      const removedBro = await interactionsService.removedBro(req.params.broId, req.userInfo)
      res.send(removedBro)
    } catch (error) {
      next(error)
    }
  }
  async deleteCommentBro(req, res, next) {
    try {
      const deleteBro = await interactionsService.deleteCommentBro(req.params.commentBroId, req.userInfo)
      res.send(deleteBro)
    } catch (error) {
      next(error)
    }
  }

  async deleteCommentHate(req, res, next) {
    try {
      const deleteHate = await interactionsService.deleteCommentHate(req.params.commentHateId, req.userInfo)
      res.send(deleteHate)
    } catch (error) {
      next(error)
    }
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
      req.body.commenterId = req.userInfo.id
      const comment = await interactionsService.addComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async getComments(req, res, next) {
    try {
      const comments = await interactionsService.getComments()
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async beHatin(req, res, next) {
    try {
      const formData = {
        haterId: req.userInfo.id,
        memeId: req.params.memeId
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
        memeId: req.params.memeId
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