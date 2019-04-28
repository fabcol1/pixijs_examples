import { Container } from 'pixi.js';
import DogSingle from './DogSingle';

export default class DogAnimationBuilder extends Container {
  constructor(game) {
    super();
    this.game = game;
    this.dogAnimations = [];
  }

  dogSingleAnim(x, y) {
    const ds = new DogSingle(this.game, x, y);
    this.addChild(ds);
    this.dogAnimations.push(ds);
  }

  logicUpdate(delta) {
    this.singleAnimLogicUpdate(delta);
  }

  singleAnimLogicUpdate(delta) {
    if (this.dogAnimations.length > 0) {
      this.dogAnimations[0].logicUpdate(delta);
      if (this.dogAnimations[0].status === 'end') {
        this.removeChild(this.dogAnimations[0]);
        this.dogAnimations.splice(0, 1);
      }
    }
  }
}
