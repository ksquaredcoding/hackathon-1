import { appState } from "../AppState.js";
import { commentsService } from "../Services/CommentsService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawActiveMeme() {
  if (appState.activeMeme == null) { return }
  setHTML('activeMeme', appState.activeMeme.ActiveMemeTemplate)
  setHTML('comments', appState.activeMeme.CommentTemplate)
}
export class CommentsController {
  constructor() {
    appState.on('activeMeme', _drawActiveMeme)
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