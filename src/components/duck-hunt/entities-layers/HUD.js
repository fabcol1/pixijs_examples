import { Container } from 'pixi.js';

export default class HUD extends Container {
  constructor(scene) {
    super();
    this.scene = scene;
  }

  update_(delta) {}
}
