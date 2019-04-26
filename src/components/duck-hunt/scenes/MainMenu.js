import { Sprite, Texture, extras } from 'pixi.js';

const { AnimatedSprite } = extras;

import Scene from './Scene.js';

export default class MainMenu extends Scene {
  constructor(resources, changeScene) {
    super(resources, changeScene);
    this.bg = new Sprite(Texture.WHITE);
    this.back = new Sprite(resources.sceneBack.texture);
    this.tree = new Sprite(resources.sceneTree.texture);

    this.bg.height = 600;
    this.bg.width = 800;
    this.bg.tint = 0x89c4f4;
    this.tree.x = 60;
    this.tree.y = 235;

    const dogSniffFrames = [
      resources.dogSniff0.texture,
      resources.dogSniff1.texture,
      resources.dogSniff2.texture,
      resources.dogSniff3.texture,
      resources.dogSniff4.texture
    ];

    this.dogFind = new Sprite(resources.dogFind.texture);
    this.dogFind.y = 470;
    this.dogFind.x = 300;

    const dogJumpFrames = [
      resources.dogJump0.texture,
      resources.dogJump1.texture
    ];

    this.dogJump = new AnimatedSprite(dogJumpFrames);
    this.dogJump.x = 320;
    this.dogJump.y = 440;
    this.dogJump.vx = 0;
    this.dogJump.vy = -3;
    this.dogJump.animationSpeed = 0.1;
    this.dogJump.loop = false;
    this.dogJump.visible = false;
    this.dogJump.onComplete = () => this.container.removeChild(this.dogJump);

    this.dogSniff = new AnimatedSprite(dogSniffFrames);
    this.dogSniff.y = 470;
    this.dogSniff.vx = 0.5;
    this.dogSniff.vy = 0;
    this.dogSniff.animationSpeed = 0.1;
    this.dogSniff.play();

    this.container.addChild(this.bg);
    this.container.addChild(this.tree);
    this.container.addChild(this.back);
    this.container.addChild(this.dogSniff);
  }

  play(delta) {
    this.dogSniff.x += this.dogSniff.vx;

    if (this.dogSniff.x == 320) {
      this.container.removeChild(this.dogSniff);
      this.container.addChild(this.dogFind);

      setTimeout(() => {
        this.container.removeChild(this.dogFind);
        this.dogJump.visible = true;
        this.dogJump.play();
        this.container.addChild(this.dogJump);
      }, 500);
    }

    if (this.dogSniff.x > 320 && this.dogJump.visible) {
      this.dogJump.y += this.dogJump.vy;
    }

    // console.log(delta);
    // console.log(this, this.back);
  }

  destroy() {}

  reset() {}
}
