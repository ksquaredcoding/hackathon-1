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

  get CommentTemplate() {
    return/*html*/`
  <div class="d-flex me-3 mb-2 align-items-center">
    <img src="${this.creator.picture}" class="img-fluid rounded picture" alt="">
    <p class="ps-2 mb-0">${this.content}</p>
  </div>
  `
  }



}