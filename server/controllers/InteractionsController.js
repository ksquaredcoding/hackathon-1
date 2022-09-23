import { interactionsService } from "../services/InteractionsService.js"
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider';
import { BadRequest } from "../utils/Errors.js";

export class InteractionsController extends BaseController {
  constructor() {
    super('/api/interactions')
    this.router
      .get('/memes/comments', this.getComments)
      .get('/memes/bros', this.getBros)
      .get('/memes/haters', this.getHaters)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/memes/:memeId/bros', this.beABro)
      .post('/memes/:memeId/haters', this.beHatin)
      .delete('/memes/haters/:hateId', this.removeHate)
      .delete('/memes/bros/:broId', this.removeBro)
      // SECTION Comment Requests
      .post('/memes/comments', this.addComment)
      .delete('/memes/comments/:commentId', this.deleteComment)
      //  STUB Comment Hater&Bro Requests
      .post('/memes/comments/commenthaters', this.hateComment)
      .post('/memes/comments/commentbros', this.broComment)
      .delete('/memes/comments/commenthaters/:commentHateId', this.deleteCommentHate)
      .delete('/memes/comments/commentbros/:commentBroId', this.deleteCommentBro)

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