

export class Meme {
  constructor(data) {
    this.name = data.name
    this.image = data.image
    this.id = data.id
    this.upVote = data.upVote || 0
    this.downVote = data.downVote || 0

    // TODO need Creator data

    this.creator = data.creator
    this.creatorId = data.creatorId
  }

  get memeTemplate() {
    return/*html*/`
      <div class="col-md-4 mb-3">
      <div class="card">
        <img
        onclick="app.memesController.getMemeById('${this.id}')"
        data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          src="${this.image}"
          alt="${this.name}" class="img-fluid rounded-top bird-img selectable" title="Peep the creeps">
        <div class="card-body">
          <h4 class="text-center">${this.name}</h4>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <span>${this.upVote} - <i onclick="app.memesController.upVote('${this.id}')" class="selectable" title="Upvote">👍</i></span>
            <span>${this.downVote} - <i onclick="app.memesController.downVote('${this.id}')" class="selectable" title="Downvote">👎</i></span>
            <span>
              <img
                title="${this.creator.name}"
                src="${this.creator.picture}"
                alt="${this.creator.name}" class="img-fluid rounded picture">
            </span>
          </div>
        </div>
      </div>
    </div>
    `
  }
}