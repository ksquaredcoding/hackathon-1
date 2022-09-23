import { dev } from './env.js'
import { EventEmitter } from './Utils/EventEmitter.js'
import { isValidProp } from './Utils/isValidProp.js'

class AppState extends EventEmitter {
  user = {}
  /** @type {import('./Models/Account.js').Account} */
  // @ts-ignore
  account = {}
  /** @type {import('./Models/Value').Value[]} */
  values = []
  socketData = []

  /** @type {import('./Models/Meme').Meme[]} */
  memes = []
  /** @type {import('./Models/ActiveMeme').ActiveMeme|null} */
  activeMeme = null

  /** @type {import('./Models/Comment').Comment|null} */
  comments = null

  haters = 0
  bros = 0



}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

if (dev) {
  // @ts-ignore
  window.appState = appState
}
