import { appState } from "../AppState.js";
import { Comment } from "../Models/Comment.js";
import { server } from "./AxiosService.js";


class CommentsService {
  async getAllComments() {

  }
  async getCommentsById(memeId) {

    // @ts-ignore
    appState.activeMeme = appState.memes.find(m => m.id == memeId) || null
    const res = await server.get('api/interactions/memes/comments', { params: { memeId } })
    console.log(res.data);
    appState.comments = res.data.map(c => new Comment(c))
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


