import { commentsService } from "../Services/CommentsService.js";
import { Pop } from "../Utils/Pop.js";


export class CommentsController {
  constructor() {

  }




  async addComment(id) {
    try {
      const comment = await commentsService.addComment(id)
    } catch (error) {
      console.error("[AddComment]", error);
      Pop.error(error)
    }
  }
  async deleteComment(id) {
    try {
      const comment = await commentsService.deleteComment(id)
    } catch (error) {
      console.error("[AddComment]", error);
      Pop.error(error)
    }
  }
}