import { appState } from "../AppState.js";
import { commentsService } from "../Services/CommentsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawActiveMeme() {
  if (appState.activeMeme == null) { return }
  setHTML('activeMeme', appState.activeMeme.ActiveMemeTemplate)

  let template = ''
  appState.comments.forEach(c => template += c.CommentTemplate)
  setHTML('comments', template)
  console.log(template);
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
      // console.log(formData);
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