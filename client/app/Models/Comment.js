


export class Comment {

  constructor(data) {
    this.contents = data.contents
    this.creator = data.creator
    this.memeId = data.memeId
  }

  get CommentTemplate() {
    return/*html*/`
  <div class="d-flex me-3 mb-2 align-items-center">
  <p class="ps-2 mb-0">${this.contents}</p>
  </div>
  `
  }

}
  // <img src="${this.creator.picture}" class="img-fluid rounded picture" alt="">