import { appState } from "../AppState.js";
import { commentsService } from "../Services/CommentsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawActiveMeme() {
  if (appState.activeMeme == null) { return }
  setHTML('activeMeme', appState.activeMeme.ActiveMemeTemplate)
  // if (appState.comments == null) { return }
  // setHTML('comments', appState.comments.CommentTemplate)
  // TODO draw +=template for comments
  let template = ''
  appState.comments.forEach(c => template += c.CommentTemplate)
  setHTML('comments', template)
}


export class CommentsController {
  constructor() {
    appState.on('activeMeme', _drawActiveMeme)
  }




  async addComment(memeId) {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target

      const formData = getFormData(form)
      const comment = await commentsService.addComment(memeId, formData)

      // @ts-ignore
      form.reset()

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