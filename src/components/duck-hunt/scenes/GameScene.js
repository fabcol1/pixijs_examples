import { Sprite, Texture, extras } from 'pixi.js';

const { AnimatedSprite } = extras;

import Background from '../entities/Background.js';
import DuckBlack from '../entities/DuckBlack.js';
import DuckRed from '../entities/DuckRed.js';
import Scene from './Scene.js';

export default class GameScene extends Scene {
  constructor(resources, changeScene) {
    super(resources, changeScene);
    this.reset();
  }

  play(delta) {
    for (let o in this.ducks) {
      this.ducks[o].logicUpdate(delta);
    }

    this.ducks = this.ducks.filter(o => {
      if (!o.isActive()) {
        o.visible = false;
        this.container.removeChild(o);
      }
      return o.isActive();
    });
  }

  destroy() {
    this.container.removeChild(this.background);
    this.changeScene('MM');
  }

  reset() {
    this.background = new Background(this.resources);

    this.ducks = [
      new DuckBlack(this, 210, 430, 'topRight'),
      new DuckBlack(this, 330, 400, 'topRight'),
      new DuckRed(this, 325, 420, 'topRight'),
      new DuckRed(this, 435, 410, 'topLeft')
    ];

    this.gameSceneEvents();

    const bgColor = new Sprite(Texture.WHITE);
    bgColor.height = 600;
    bgColor.width = 800;
    bgColor.tint = 0x89c4f4;

    this.container.addChild(bgColor);

    for (const o of this.ducks) {
      this.container.addChild(o);
    }
    this.container.addChild(this.background);
  }

  gameSceneEvents() {
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
  }
}
