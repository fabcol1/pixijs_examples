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
      // if user can shot check if has shot a duck

      const shotBg = new Sprite(Texture.WHITE);
      shotBg.height = 600;
      shotBg.width = 800;
      shotBg.alpha = 0.5;
      this.scene.mainContainer.addChild(shotBg);
      setTimeout(() => {
        this.scene.mainContainer.removeChild(shotBg);
      }, 20);

      const point = e.data.getLocalPosition(this.scene.mainContainer);
      const shotRadius = 100; // pixel
      let nOfHitDucks = 0;

      // const graphics = new Graphics();
      // graphics.beginFill(0xe74c3c);
      // graphics.drawCircle(point.x, point.y, shotRadius); //
      // graphics.endFill();
      // this.scene.mainContainer.addChild(graphics);

      this.scene.ducks.ducks.forEach(duck => {
        nOfHitDucks += duck.haveHitMe(point, shotRadius) ? 1 : 0;
      });

      console.log(nOfHitDucks);

      // generate dog animation
      const exced = nOfHitDucks % 2;
      const doubleAnim = nOfHitDucks / 2;
      console.log('exed: ', exced);
      console.log('doubleAnim: ', doubleAnim);
      for (let i = 0; i < doubleAnim; i++) {
        console.log('double');
        // this.scene.dogAnimations.dogDoubleAnim(400, 480);
      }
      nOfHitDucks -= doubleAnim * 2;
      nOfHitDucks += exced;
      console.log('nofhit', nOfHitDucks);
      for (let i = 0; i < nOfHitDucks; i++) {
        console.log('single');
        // this.scene.dogAnimations.dogSingleAnim(400, 480);
      }

      this.scene.ducks.nOfKilledDucks += nOfHitDucks;
    });

    // this.scene.mainContainer.on('duckkill', (e, x) => {
    //   this.scene.ducks.nOfKilledDucks++;
    //   this.scene.dogAnimations.dogSingleAnim(x, 500);
    // });

    this.scene.mainContainer.on('duckescape', (e, x, y) => {
      console.log('duckescape');
    });

    this.scene.mainContainer.on('wave-end', e => {
      if (this.scene.dogAnimations.allAnimAreOver()) {
        this.scene.changeScene('GO');
      }
    });
  }
  removeEventListeners() {
    this.scene.mainContainer.removeAllListeners();
  }
}
