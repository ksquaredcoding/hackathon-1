import { memesService } from "../services/MemesService.js"
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider';
export class MemesController extends BaseController {
  constructor() {
    super('/api/memes')
    this.router
      .get('', this.getAllMemes)
      .get('/:memeId', this.getMemeById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.makeMeme)
      .delete('/:memeId', this.deleteMeme)
  }

  async deleteMeme(req, res, next) {
    try {
      const meme = await memesService.deleteMeme(req.params.memeId, req.userInfo)
      res.send(meme)
    } catch (error) {
      next(error)
    }
  }

  async getAllMemes(req, res, next) {
    try {
      const memes = await memesService.getAllMemes()
      res.send(memes)
    } catch (error) {
      next(error)
    }
  }
  async getMemeById(req, res, next) {
    try {
      const meme = await memesService.getMemeById(req.params.memeId)
      res.send(meme)
    } catch (error) {
      next(error)
    }
  }

  async makeMeme(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id

      const madeMeme = await memesService.makeMeme(req.body)
      res.send(madeMeme)
    } catch (error) {
      next(error)
    }
  }
}