import { Sprite } from 'pixi.js';

export default class DogSingle extends Sprite {
  constructor(scene, x, y) {
    super(scene.resources.dogSingle.texture);
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
    this.vy = -3;

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
        this.vy = 4;
      }, 500);
    } else if (this.y > this.maxY) {
      this.visible = false;
      this.status = 'end';
    }
  }
}
