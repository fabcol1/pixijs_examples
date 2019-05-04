import { extras } from 'pixi.js';
const { AnimatedSprite } = extras;

export default class DogLaugh extends AnimatedSprite {
  constructor(scene, x, y) {
    super([
      scene.resources.dogLaugh0.texture,
      scene.resources.dogLaugh1.texture
    ]);
    this.animationSpeed = 0.1;
    this.play();
    this.scene = scene;
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
