import { memesService } from "../Services/MemesService.js";
import { Pop } from "../Utils/Pop.js";





export class MemesController {
  constructor() {

  }

  async addMeme() {
    try {
      const meme = await memesService.addMemes()
    } catch (error) {
      console.error("[addMeme]", error);
      Pop.error(error)
    }
  }
  async deleteMeme(id) {
    try {
      const meme = await memesService.deleteMeme(id)
    } catch (error) {
      console.error("[Del Meme]", error);
      Pop.error(error)
    }
  }


  async getMemes() {
    try {
      const memes = await memesService.getMemes()
    } catch (error) {
      console.error("[GetMeme]", error);
      Pop.error(error)
    }
  }

  async getMemeByID(id) {
    try {
      const meme = await memesService.getMeme(id)

    } catch (error) {
      console.error("[GetMemebyID]", error);
      Pop.error(error)
    }
  }


  async upVoteMeme(id) {
    try {
      const meme = await memesService.upVote(id)
    } catch (error) {
      console.error("[Upvote]", error);
      Pop.error(error)
    }
  }
  async downVoteMeme(id) {
    try {
      const meme = await memesService.downVote(id)
    } catch (error) {
      console.error("[DownVote]", error);
      Pop.error(error)
    }
  }

}