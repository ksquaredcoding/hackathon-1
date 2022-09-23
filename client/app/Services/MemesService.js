import { appState } from "../AppState.js";
import { Meme } from "../Models/Meme.js";
import { server } from "./AxiosService.js";



class MemesService {
  async addMemes(formData) {
    const res = await server.post('api/memes', formData)
    console.log(res.data);
    appState.memes = [new Meme(res.data), ...appState.memes]
  }
  hater(id) {
    throw new Error("Method not implemented.");
  }
  bro(id) {
    throw new Error("Method not implemented.");
  }
  deleteMeme(id) {
    throw new Error("Method not implemented.");
  }
  getMeme() {
    throw new Error("Method not implemented.");
  }
  async getMemes() {
    const res = await server.get('api/memes')
    appState.memes = res.data.map(m => new Meme(m))
  }

}
export const memesService = new MemesService()