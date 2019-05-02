import { Container } from 'pixi.js';
import DuckBlack from '../entities/DuckBlack.js';
import DuckRed from '../entities/DuckRed.js';
import Math2 from '../utils/Math2';

class Wave extends Container {
  constructor(scene, nOfDucks, duration) {
    super();
    this.scene = scene;
    this.nOfDucks = nOfDucks;
    this.nOfKilledDucks = 0;
    this.start = new Date();
    this.duration = duration;
    this.ended = false;
    this.ducks = [];
    this._init();
  }

  update_(delta) {
    if (!this.ended && (new Date() - this.start) / 1000 > this.duration) {
      this.ended = true;
      this.ducks.forEach(duck => (duck.marginControl = false));
    }

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

  _init() {
    for (let i = 0; i < this.nOfDucks; i++) {
      const state = Math.round(Math.random()) === 0 ? 'topRight' : 'topLeft';
      const x = Math2.randomInt(210, 435);
      const y = Math2.randomInt(470, 480);
      this.ducks.push(
        Math.round(Math.random()) === 0
          ? new DuckRed(this.scene, x, y, state)
          : new DuckBlack(this.scene, x, y, state)
      );
    }
    this.ducks.forEach(duck => this.addChild(duck));
  }
}

export default Wave;
