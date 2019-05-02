import { Container } from 'pixi.js';
import DuckBlack from '../entities/DuckBlack.js';
import DuckRed from '../entities/DuckRed.js';

export default class Ducks extends Container {
  constructor(scene) {
    super();
    this.scene = scene;
    this.ducks = [];
  }

  update_(delta) {
    this.ducks.forEach(duck => duck.logicUpdate(delta));
    this.ducks = this.ducks.filter(o => {
      const isActive = o.isActive();
      if (!isActive) {
        o.visible = false;
        this.removeChild(o);
      }
      return isActive;
    });
    if (this.ducks.length === 0) {
      this.scene.mainContainer.emit('wave-end', new Event('wave-end'));
    }
  }

  generateWave() {
    this.ducks = [
      new DuckBlack(this.scene, 210, 470),
      new DuckBlack(this.scene, 330, 470),
      new DuckRed(this.scene, 325, 470),
      new DuckRed(this.scene, 435, 470)
    ];
    this.ducks.forEach(duck => this.addChild(duck));
  }
}
