import { Sprite, Container } from 'pixi.js';

export default class Background extends Container {
  constructor(scene) {
    super();
    this.scene = scene;
    this.back = new Sprite(this.scene.resources.sceneBack.texture);
    this.tree = new Sprite(this.scene.resources.sceneTree.texture);
    this.tree.x = 60;
    this.tree.y = 235;
    this.addChild(this.tree);
    this.addChild(this.back);
  }
}
