import { Sprite, Texture, Container } from 'pixi.js';

export default class Background extends Container {
  constructor(resources) {
    super();
    // this.bg = new Sprite(Texture.WHITE);
    this.back = new Sprite(resources.sceneBack.texture);
    this.tree = new Sprite(resources.sceneTree.texture);
    // this.bg.height = 600;
    // this.bg.width = 800;
    // this.bg.tint = 0x89c4f4;
    this.tree.x = 60;
    this.tree.y = 235;

    // this.addChild(this.bg);
    this.addChild(this.tree);
    this.addChild(this.back);
  }
}
