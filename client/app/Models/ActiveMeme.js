import { Meme } from "./Meme.js";



export class ActiveMeme extends Meme {
  constructor(data) {
    super(data);
    this.content = data.content


  }

  get ActiveMemeTemplate() {
    return/*html*/`
  <img class="img-fluid rounded" src="${this.image}" alt="">
  `
  }





}