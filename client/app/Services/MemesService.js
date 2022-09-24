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
    console.log(res.data);
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
    appState.activeMeme = new ActiveMeme(res.data)
    console.log(appState.activeMeme);
  }
  async hater(memeId) {
    Pop.success("You're a Hater")
    const res = await server.post(`api/interactions/memes/${memeId}/haters`)
    console.log('hater post', res.data);
    // appState.emit('memes')
    // @ts-ignore
    appState.haters = res.data
    // console.log('appstate', appState.haters);
  }
  async bro(memeId) {
    Pop.success("You're a Bro")
    const res = await server.post(`api/interactions/memes/${memeId}/bros`)
    // appState.emit('memes')
    appState.bros = res.data
  }

}
export const memesService = new MemesService()