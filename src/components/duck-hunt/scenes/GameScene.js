import { Sprite, Texture, extras } from 'pixi.js';

const { AnimatedSprite } = extras;

import Background from '../entities/Background.js';
import Duck from '../entities/Duck.js';
import Scene from './Scene.js';

export default class GameScene extends Scene {
  constructor(resources, changeScene) {
    super(resources, changeScene);
    this.reset();
  }

  play(delta) {}

  destroy() {
    this.container.removeChild(this.background);
    this.changeScene('MM');
  }

  reset() {
    this.background = new Background(this.resources);
    this.background.initOnClickEffect();

    this.duck = new Duck(
      [
        this.resources.duckBlackDead0.texture,
        this.resources.duckBlackDead1.texture,
        this.resources.duckBlackDead2.texture
      ],
      'left',
      100,
      100,
      0,
      0
    );

    // setTimeout(() => {
    //   this.duck.left([
    //     this.resources.duckRedDead0.texture,
    //     this.resources.duckRedDead1.texture,
    //     this.resources.duckRedDead2.texture
    //   ]);
    // }, 3000);
    this.container.addChild(this.background);
    this.container.addChild(this.duck);
  }
}
