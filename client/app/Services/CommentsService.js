import { appState } from "../AppState.js";
import { server } from "./AxiosService.js";


class CommentsService {
  deleteComment(id) {
    throw new Error("Method not implemented.");
  }
  async addComment(memeId, formData) {
    const res = await server.post(`api/memes/${memeId}/comments/`, formData)


  }

}

export const commentsService = new CommentsService()