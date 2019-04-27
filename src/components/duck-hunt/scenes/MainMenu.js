import { Sprite, Texture, extras } from 'pixi.js';

const { AnimatedSprite } = extras;

import Background from '../entities/Background.js';
import DogEntryAnimation from '../animations/DogEntryAnimation.js';
import Scene from './Scene.js';

export default class MainMenu extends Scene {
  constructor(resources, changeScene) {
    super(resources, changeScene);
    this.reset();
  }

  play(delta) {
    this.dog.play[this.dog.status](delta);
    if (this.dog.status == 'isOver') {
      this.destroy();
    }
  }

  destroy() {
    this.container.removeChild(this.background);
    this.container.removeChild(this.dog);
    this.changeScene('GS');
  }

  reset() {
    this.background = new Background(this.resources);
    this.dog = new DogEntryAnimation(this.resources);
    this.container.addChild(this.background);
    this.container.addChild(this.dog);
  }
}
