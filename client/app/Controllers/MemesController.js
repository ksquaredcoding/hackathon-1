import { appState } from "../AppState.js";
import { memesService } from "../Services/MemesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawMemes() {
  let template = ''
  appState.memes.forEach(m => template += m.memeTemplate)
  setHTML('memes', template)
}


export class MemesController {
  constructor() {
    this.getMemes()
    appState.on('memes', _drawMemes)
  }

  async addMeme() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      const formData = getFormData(form)
      const meme = await memesService.addMemes(formData)
      // @ts-ignore
      form.reset()
      const modal = bootstrap.Modal.getOrCreateInstance('#memeModal')
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
      const meme = await memesService.getMemeByID(id)

    } catch (error) {
      console.error("[GetMemebyID]", error);
      Pop.error(error)
    }
  }


  async bro(id) {
    try {
      const meme = await memesService.bro(id)
    } catch (error) {
      console.error("[Upvote]", error);
      Pop.error(error)
    }
  }
  async hater(id) {
    try {
      const meme = await memesService.hater(id)
    } catch (error) {
      console.error("[DownVote]", error);
      Pop.error(error)
    }
  }

}