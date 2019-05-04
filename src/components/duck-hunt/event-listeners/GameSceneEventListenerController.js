import { Sprite, Texture, Graphics } from 'pixi.js';
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
      // if wave is over.. return
      if (this.scene.ducks.ended) {
        return;
      }

      // if bullets are over... set wave to end..
      if (false) {
        this.scene.ducks.waveEnd();
      }

      const shotBg = new Sprite(Texture.WHITE);
      shotBg.height = 600;
      shotBg.width = 800;
      shotBg.alpha = 0.5;
      this.scene.mainContainer.addChild(shotBg);
      setTimeout(() => {
        this.scene.mainContainer.removeChild(shotBg);
      }, 20);

      const point = e.data.getLocalPosition(this.scene.mainContainer);
      const shotRadius = 40; // pixel
      let nOfHitDucks = 0;

      // const graphics = new Graphics();
      // graphics.beginFill(0x333);
      // graphics.drawCircle(point.x, point.y, shotRadius); //
      // graphics.endFill();
      // this.scene.mainContainer.addChild(graphics);
      // setTimeout(() => {
      //   this.scene.mainContainer.removeChild(graphics);
      // }, 40);

      this.scene.ducks.ducks.forEach(duck => {
        nOfHitDucks += duck.haveHitMe(point, shotRadius) ? 1 : 0;
      });

      // generate dog animation
      for (let i = nOfHitDucks; i > 0; i -= 2) {
        if (i >= 2) {
          setTimeout(() => {
            this.scene.dogAnimations.dogFoundDoubleAnim(point.x, 475);
          }, 1200);
        } else {
          setTimeout(() => {
            this.scene.dogAnimations.dogFoundSingleAnim(point.x, 475);
          }, 1200);
        }
      }

      this.scene.ducks.nOfKilledDucks += nOfHitDucks;
    });

    this.scene.mainContainer.on('duckescape', (e, x, y) => {
      console.log('duckescape');
    });

    this.scene.mainContainer.on('wave-end-change-anim', e => {
      if (this.scene.dogAnimations.allAnimAreOver()) {
        // next wave
        // this.scene.nextWave(20, 20);
        // next level

        // game over
        this.scene.changeScene('GO');

        // game win
      }
    });

    this.scene.mainContainer.on('wave-end-dog-laugh', e => {
      this.scene.bgColor.tint = 0xfc9688;
      // dog laugh animation
      this.scene.dogAnimations.dogLaughAnim(0, 475);
    });
  }
  removeEventListeners() {
    this.scene.mainContainer.removeAllListeners();
  }
}
