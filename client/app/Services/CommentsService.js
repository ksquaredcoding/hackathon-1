import { appState } from "../AppState.js";
import { Comment } from "../Models/Comment.js";
import { Pop } from "../Utils/Pop.js";
import { server } from "./AxiosService.js";


class CommentsService {
  async deleteComment(id) {
    if (await Pop.confirm("Are you sure?") == true) {

      await server.delete(`api/comments/${id}`)
      appState.comments = appState.comments.filter(c => c.id != id)
    }
  }
  async getAllComments() {
    const res = await server.get('api/interactions/memes/comments')
    console.log(res.data, 'all comments');
    appState.comments = res.data.map(c => new Comment(c))
    console.log('appstate comments', appState.comments);
  }
  async getCommentsById(memeId) {

    // @ts-ignore
    appState.activeMeme = appState.memes.find(m => m.id == memeId) || null
    const res = await server.get('api/interactions/memes/comments', { params: { memeId } })
    console.log(res.data, 'comments by meme');
    // appState.comments = res.data.map(c => new Comment(c))
  }



  async addComment(formData) {
    // console.log('comment info', formData);
    // debugger

    const res = await server.post(`api/interactions/memes/comments`, formData)

    const newComment = new Comment(res.data)
    appState.comments = [newComment, ...appState.comments]

  }

}

export const commentsService = new CommentsService()


