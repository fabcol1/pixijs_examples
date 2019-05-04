import { Container } from 'pixi.js';

export default class HUD extends Container {
  constructor(scene, nOfBullets) {
    super();
    this.scene = scene;
    this.nOfBullets = nOfBullets;
    this.hitDucks = 0;
    this.missDucks = 0;
  }

  update_(delta) {}

  init_() {}
}
