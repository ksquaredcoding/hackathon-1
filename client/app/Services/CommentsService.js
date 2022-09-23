import { server } from "./AxiosService.js";


class CommentsService {
  deleteComment(id) {
    throw new Error("Method not implemented.");
  }
  async addComment(id, formData) {
    const res = await server.post(`api/${id}/comments/`, formData)
  }

}

export const commentsService = new CommentsService()