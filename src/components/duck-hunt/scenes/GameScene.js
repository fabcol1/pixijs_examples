import { Sprite, Texture, extras, Container } from 'pixi.js';

const { AnimatedSprite } = extras;

import Background from '../entities/Background.js';
import DuckBlack from '../entities/DuckBlack.js';
import DuckRed from '../entities/DuckRed.js';
import Scene from './Scene.js';
import DogAnimationBuilder from '../animations/DogAnimationBuilder.js';

export default class GameScene extends Scene {
  constructor(resources, changeScene) {
    super(resources, changeScene);
    this.reset();
  }

  play(delta) {
    this.ducks.forEach(duck => duck.logicUpdate(delta));
    this.ducks = this.ducks.filter(o => {
      const isActive = o.isActive();
      if (!isActive) {
        o.visible = false;
        this.container.removeChild(o);
      }
      return isActive;
    });

    this.dogAnimationBuilder.logicUpdate(delta);
  }

  destroy() {
    this.container.removeChild(this.background);
    this.changeScene('MM');
  }

  reset() {
    this.background = new Background(this.resources);
    this.dogAnimationBuilder = new DogAnimationBuilder(this);
    this.ducks = [
      new DuckBlack(this, 210, 430, 'topRight'),
      new DuckBlack(this, 330, 400, 'topRight'),
      new DuckRed(this, 325, 420, 'topRight'),
      new DuckRed(this, 435, 410, 'topLeft')
    ];

    this.gameSceneEvents();
    this.bgColor();
    this.ducks.forEach(duck => this.container.addChild(duck));
    this.container.addChild(this.dogAnimationBuilder);
    this.container.addChild(this.background);
  }

  gameSceneEvents() {
    this.container.removeAllListeners();
    this.container.interactive = true;
    this.container.on('pointerdown', e => {
      const shotBg = new Sprite(Texture.WHITE);
      shotBg.height = 600;
      shotBg.width = 800;
      shotBg.alpha = 0.5;
      this.container.addChild(shotBg);
      setTimeout(() => {
        this.container.removeChild(shotBg);
      }, 20);
    });
    this.container.on('duckkill', (e, x) => {
      this.dogAnimationBuilder.dogSingleAnim(x, 500);
    });
  }

  bgColor() {
    const bgColor = new Sprite(Texture.WHITE);
    bgColor.height = 600;
    bgColor.width = 800;
    bgColor.tint = 0x89c4f4;
    this.container.addChild(bgColor);
  }
}
