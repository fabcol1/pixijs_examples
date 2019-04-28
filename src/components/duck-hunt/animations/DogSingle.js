import { Sprite } from 'pixi.js';

export default class DogSingle extends Sprite {
  constructor(game, x, y) {
    super(game.resources.dogSingle.texture);
    this.game = game;
    this.x = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550].reduce(
      (prev, curr) => {
        return Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev;
      },
      x
    );
    this.y = y;
    this.vx = 0;
    this.vy = -3;

    this.minY = y - 120;
    this.maxY = y + 1;

    this.status = 'running';
  }

  logicUpdate(delta) {
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
      this.status = 'end';
    }
  }
}
