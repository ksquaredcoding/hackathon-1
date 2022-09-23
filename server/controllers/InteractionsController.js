import { memesService } from "../services/MemesService.js"
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider';
import { BadRequest } from "../utils/Errors.js";

export class InteractionsController extends BaseController {
  constructor() {
    super('/api/interactions')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/haters', this.beHatin)
      .post('bros', this.beABro)
      .get('/haters', this.getHaters)
      .get('/bros', this.getBros)
  }
  async beHatin(req, res, next) {
    try {
      const formData = {
        haterId: req.userInfo.id,
        memeId: req.body.memeId
      }
      const hater = await memesService.beHatin(formData)
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
      const haters = await memesService.getHaters(req.query)
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
      const bro = await memesService.beABro(formData)
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
      const bros = await memesService.getBros(req.query)
      res.send(bros)
    } catch (error) {
      next(error)
    }
  }
}