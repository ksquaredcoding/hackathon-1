import { appState } from "../AppState.js";
import { setHTML } from "../Utils/Writer.js";
import { Meme } from "./Meme.js";



export class ActiveMeme extends Meme {
  constructor(data) {
    super(data);
    this.contents = data.contents


  }

  get ActiveMemeTemplate() {
    return/*html*/`
    <div class="col-6" >
      <img class="img-fluid rounded" src="${this.image}" alt="">
    </div>
    <div class="col-6">
      <div>${this.Comments}</div>
        <form onsubmit="app.commentsController.addComment('${this.id}')">
          <div class="form-floating mb-3"> <input type="text" class="form-control" id="contents"
          name="contents" placeholder="Comment"> <label for="contents">Add spicy comment...</label>
          </div>
          <div class="modal-footer"> <button type="button" class="btn btn-secondary"
          data-bs-dismiss="modal">Close</button> <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
    </div>

  `
  }


  get Comments() {
    let comments = appState.comments.filter(c => c.memeId == this.id)
    let template = ''
    comments.forEach(c => template += c.CommentTemplate)
    console.log(template);
    return template
  }





}