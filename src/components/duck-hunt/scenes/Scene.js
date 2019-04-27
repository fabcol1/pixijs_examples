import { Container } from 'pixi.js';

export default class Scene {
  constructor(resources, changeScene) {
    this.changeScene = changeScene;
    this.play = this.play.bind(this);
    this.destroy = this.destroy.bind(this);
    this.reset = this.reset.bind(this);
    this.container = new Container();
    this.resources = resources;
  }

  play(delta) {
    throw new Error('You have to implement the method play(delta)!');
  }

  destroy() {
    throw new Error('You have to implement the method destory()!');
  }

  reset() {
    throw new Error('You have to implement the method reset()!');
  }
}
