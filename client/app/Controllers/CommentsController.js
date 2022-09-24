import { appState } from "../AppState.js";
import { commentsService } from "../Services/CommentsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawActiveMeme() {
  if (appState.activeMeme == null) { return }
  setHTML('activeMeme', appState.activeMeme.ActiveMemeTemplate)

}

// function _drawComments() {

//   let template = ''
//   appState.comments.forEach(c => template += c.CommentTemplate)
//   console.log(template);
//   setHTML('comments', template)

// }


export class CommentsController {
  constructor() {
    appState.on('activeMeme', _drawActiveMeme)
    appState.on('comments', _drawActiveMeme)
    this.getAllComments()
  }

  async getCommentsById(memeId) {
    try {
      await commentsService.getCommentsById(memeId)
    } catch (error) {
      console.error("[find commetns]", error);
      Pop.error(error)
    }
  }


  async getAllComments() {
    try {
      const comments = commentsService.getAllComments()
    } catch (error) {
      console.error(error)
    }
  }

  async addComment(memeId) {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target

      const formData = getFormData(form)
      // @ts-ignore
      formData.memeId = memeId
      console.log(formData);
      const comment = await commentsService.addComment(formData)

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