import { memesService } from "../services/MemesService.js"
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider';

export class InteractionsController extends BaseController {
  constructor() {
    super('/api/memes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.beHatin)
      .
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
}