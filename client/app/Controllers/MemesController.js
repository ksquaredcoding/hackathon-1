import { Pop } from "../Utils/Pop.js";





export class MemesController {
  constructor() {

  }


  async getMemes() {
    try {


    } catch (error) {
      console.error("[GetMeme]", error);
      Pop.error(error)

    }

  }

  async getMemeByID() {
    try {

    } catch (error) {
      console.error("[GetMemebyID]", error);
      Pop.error(error)

    }

  }

  async deleteMeme() {
    try {

    } catch (error) {
      console.error("[Del Meme]", error);
      Pop.error(error)

    }

  }
}