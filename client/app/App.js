import { AuthController } from './Controllers/AuthController.js';
import { MemesController } from './Controllers/MemesController.js';
import { ValuesController } from './Controllers/ValuesController.js';

class App {
  authController = new AuthController();

  memesController = new MemesController()
}

// @ts-ignore
window.app = new App()
