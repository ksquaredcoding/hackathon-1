import { appState } from "../AppState.js";
import { ActiveMeme } from "../Models/ActiveMeme.js";
import { Meme } from "../Models/Meme.js";
import { Pop } from "../Utils/Pop.js";
import { server } from "./AxiosService.js";



class MemesService {
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
  async getMemeByID(id) {
    const res = await server.get(`api/memes/${id}`)
    appState.activeMeme = res.data.map(m => new ActiveMeme(m))
  }
  async hater(id) {
    throw new Error("Method not implemented.");
  }
  async bro(id) {
    throw new Error("Method not implemented.");
  }

}
export const memesService = new MemesService()