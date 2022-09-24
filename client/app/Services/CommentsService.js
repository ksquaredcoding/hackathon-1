import { appState } from "../AppState.js";
import { Comment } from "../Models/Comment.js";
import { server } from "./AxiosService.js";


class CommentsService {
  deleteComment(id) {
    throw new Error("Method not implemented.");
  }
  async addComment(memeId, formData) {
    // console.log('comment info', formData);
    // debugger
    formData.memeId = memeId
    const res = await server.post(`api/interactions/memes/comments`, formData)

    const newComment = new Comment(res.data)
    appState.comments = [newComment, ...appState.comments]

  }

}

export const commentsService = new CommentsService()


