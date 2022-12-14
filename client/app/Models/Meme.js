

export class Meme {
  constructor(data) {
    this.description = data.description
    this.image = data.image
    this.id = data.id
    this.bros = data.bros || 0
    this.haters = data.haters || 0

    // TODO need Creator data

    this.creator = data.creator
    this.creatorId = data.creatorId
  }

  get memeTemplate() {
    return/*html*/`
      <div class="col-md-4 mb-3">
      <div class="card">
        <img data-bs-toggle="modal" data-bs-target="#activeMemeModal"
        onclick="app.memesController.getActiveMeme('${this.id}')"
          src="${this.image}"
          alt="${this.description}" class="img-fluid rounded-top meme-img selectable" title="${this.description}">
        <div class="card-body">
          <h4 class="text-center">${this.description}</h4>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <span>${this.bros} - <i onclick="app.memesController.bro('${this.id}')" class="selectable" title="Upvote">👍</i></span>
            <span>${this.haters} - <i onclick="app.memesController.hater('${this.id}')" class="selectable" title="Downvote">👎</i></span>
            <span>
              <i class="mdi mdi-delete-circle fs-3" onclick="app.memesController.deleteMeme('${this.id}')"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    `
  }


}