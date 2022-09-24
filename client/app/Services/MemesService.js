import { appState } from "../AppState.js";
import { ActiveMeme } from "../Models/ActiveMeme.js";
import { Meme } from "../Models/Meme.js";
import { Pop } from "../Utils/Pop.js";
import { server } from "./AxiosService.js";



class MemesService {
  async getOldMemes() {
    const res = await server.get('api/memes/sort/oldmemes')
    appState.oldMemes = res.data.map(m => new Meme(m))
  }
  async addMemes(formData) {
    const res = await server.post('api/memes', formData)
    // console.log(res.data);
    appState.memes = [new Meme(res.data), ...appState.memes]
  }
  async deleteMeme(id) {
    if (await Pop.confirm("Are you sure?") == true) {

      await server.delete(`api/memes/${id}`)
      appState.memes = appState.memes.filter(m => m.id != id)
    }
  }
  async getMemes() {
    const res = await server.get('api/memes')
    appState.memes = res.data.map(m => new Meme(m))
  }
  async getActiveMeme(id) {
    const res = await server.get(`api/memes/${id}`)
    const response = await server.get(`api/interactions/memes/comments?memeId=${id}`)
    console.log(response.data);
    appState.activeMeme = new ActiveMeme(res.data)
    appState.comments = response.data.map(c => new Comment(c))
    console.log(appState.comments);
    console.log(appState.activeMeme);
  }
  async hater(memeId) {
    Pop.success("You're a Hater")
    const res = await server.post(`api/interactions/memes/${memeId}/haters`)
    // console.log('hater post', res.data);
    const updatedMeme = appState.memes.find(m => m.id == memeId)
    if (!updatedMeme) {
      return "No meme found"
    }
    // @ts-ignore
    updatedMeme.haters++
    appState.emit('memes')
  }
  async bro(memeId) {
    Pop.success("You're a Bro")
    const res = await server.post(`api/interactions/memes/${memeId}/bros`)
    // appState.emit('memes')
    appState.bros = res.data
  }

}
export const memesService = new MemesService()