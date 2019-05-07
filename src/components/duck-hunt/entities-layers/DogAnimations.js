import { Container } from 'pixi.js';
import DogEntry from '../entities/DogEntry';
import { DogFoundSingle, DogFoundDouble } from '../entities/DogDucksFound';
import DogLaugh from '../entities/DogLaugh';

export default class DogAnimations extends Container {
  constructor(scene) {
    super();
    this.scene = scene;
    this.dogFoundAnimArr = [];
    this.dogEntryAnimArr = [];
    this.dogLaugh = null;
  }

  update_(delta) {
    this.dogEntryAnimUpdate(delta);
    if (this.dogLaugh === null) {
      this.dogFoundAnimLogicUpdate(delta);
    } else {
      this.dogFoundAnimArr.forEach(an => {
        an.visible = false;
        an.texture = null;
        this.removeChild(an);
      });
      this.dogFoundAnimArr = [];
      this.dogLaughAnimUpdate(delta);
    }
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

  dogFoundSingleAnim(x, y) {
    const ds = new DogFoundSingle(this.scene, x, y);
    this.addChild(ds);
    this.dogFoundAnimArr.push(ds);
  }
  dogFoundDoubleAnim(x, y) {
    const ds = new DogFoundDouble(this.scene, x, y);
    this.addChild(ds);
    this.dogFoundAnimArr.push(ds);
  }
  dogFoundAnimLogicUpdate(delta) {
    if (this.dogFoundAnimArr.length > 0) {
      this.dogFoundAnimArr[0].update_(delta);
      if (this.dogFoundAnimArr[0].status === 'end') {
        this.dogFoundAnimArr[0].visible = false;
        this.dogFoundAnimArr[0].texture = null;
        this.removeChild(this.dogFoundAnimArr[0]);
        this.dogFoundAnimArr.splice(0, 1);
      }
    }
  }
  dogLaughAnim(x, y) {
    const ds = new DogLaugh(this.scene, x, y);
    this.addChild(ds);
    this.dogLaugh = ds;
  }
  dogLaughAnimUpdate(delta) {
    if (this.dogLaugh !== null) {
      this.dogLaugh.update_(delta);
      if (this.dogLaugh.status === 'end') {
        this.dogLaugh.visible = false;
        this.dogLaugh.texture = false;
        this.removeChild(this.dogLaugh);
        this.dogLaugh = null;
      }
    }
  }

  allAnimAreOver() {
    return (
      this.dogFoundAnimArr.length === 0 &&
      this.dogEntryAnimArr.length === 0 &&
      this.dogLaugh === null
    );
  }
}
