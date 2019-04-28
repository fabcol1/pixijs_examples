import { Sprite, Texture } from 'pixi.js';
import EventListenerController from './EventListenerController';

export default class GameSceneEventListenerController extends EventListenerController {
  constructor(scene) {
    super();
    this.scene = scene;
  }

  initEventListeners() {
    this.scene.mainContainer.removeAllListeners();
    this.scene.mainContainer.interactive = true;

    this.scene.mainContainer.on('pointerdown', e => {
      const shotBg = new Sprite(Texture.WHITE);
      shotBg.height = 600;
      shotBg.width = 800;
      shotBg.alpha = 0.5;
      this.scene.mainContainer.addChild(shotBg);
      setTimeout(() => {
        this.scene.mainContainer.removeChild(shotBg);
      }, 20);
    });

    this.scene.mainContainer.on('duckkill', (e, x) => {
      this.scene.dogAnimationBuilder.dogSingleAnim(x, 500);
    });

    this.scene.mainContainer.on('wave-end', e => {
      if (this.scene.dogAnimationBuilder.allAnimAreOver()) {
        this.scene.changeScene('GO');
      }
    });
  }
  removeEventListeners() {
    this.scene.mainContainer.removeAllListeners();
  }
}
