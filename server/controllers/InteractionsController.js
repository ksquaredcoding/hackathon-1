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
      .post('/comments')
      .get('/haters', this.getHaters)
      .get('/bros', this.getBros)
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