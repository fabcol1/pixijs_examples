import { Sprite } from 'pixi.js';

class DogDucksFound extends Sprite {
  constructor(scene, texture, x, y) {
    super(texture);
    this.scene = scene;
    // this.x = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450].reduce(
    //   (prev, curr) => {
    //     return Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev;
    //   },
    //   x
    // );
    this.x = 300;
    this.y = y;
    this.vx = 0;
    this.vy = -6;
    this.minY = y - 100;
    this.maxY = y + 1;
    this.status = 'running';
  }

  update_(delta) {
    if (this.status === 'idle' || this.status === 'end') return;
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < this.minY) {
      this.status = 'idle';
      this.vy = 0;
      setTimeout(() => {
        this.status = 'running';
        this.vy = 6;
      }, 300);
    } else if (this.y > this.maxY) {
      this.visible = false;
      this.status = 'end';
    }
  }
}

class DogFoundSingle extends DogDucksFound {
  constructor(scene, x, y) {
    super(scene, scene.resources.dogSingle.texture, x, y);
  }
}

class DogFoundDouble extends DogDucksFound {
  constructor(scene, x, y) {
    super(scene, scene.resources.dogDouble.texture, x, y);
  }
}

export { DogFoundSingle, DogFoundDouble };
