import { Container } from 'pixi.js';
import DogSingle from '../entities/DogSingle';
import DogEntry from '../entities/DogEntry';

export default class DogAnimationBuilder extends Container {
  constructor(scene) {
    super();
    this.scene = scene;
    this.dogSingleAnimArr = [];
    this.dogEntryAnimArr = [];
  }

  update_(delta) {
    this.dogEntryAnimUpdate(delta);
    this.dogSingleAnimLogicUpdate(delta);
  }

  dogEntryAnim(x, y) {
    const dea = new DogEntry(this.scene, x, y);
    this.addChild(dea);
    this.dogEntryAnimArr.push(dea);
  }
  dogEntryAnimUpdate(delta) {
    this.dogEntryAnimArr.forEach(dea => {
      dea.update_(delta);
    });
  }

  dogSingleAnim(x, y) {
    const ds = new DogSingle(this.scene, x, y);
    this.addChild(ds);
    this.dogSingleAnimArr.push(ds);
  }
  dogSingleAnimLogicUpdate(delta) {
    if (this.dogSingleAnimArr.length > 0) {
      this.dogSingleAnimArr[0].update_(delta);
      if (this.dogSingleAnimArr[0].status === 'end') {
        this.removeChild(this.dogSingleAnimArr[0]);
        this.dogSingleAnimArr.splice(0, 1);
      }
    }
  }

  allAnimAreOver() {
    return (
      this.dogSingleAnimArr.length === 0 && this.dogEntryAnimArr.length === 0
    );
  }
}
