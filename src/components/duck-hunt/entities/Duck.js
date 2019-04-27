import { Sprite, Texture, Container, extras } from 'pixi.js';
const { AnimatedSprite } = extras;

export default class Duck extends AnimatedSprite {
  constructor(textures, activeStatus, x, y, vx, vy) {
    super(textures);
    this.activeStatus = activeStatus;
    this.status = {
      left: 'left',
      right: 'right',
      topLeft: 'top-left',
      topRight: 'top-right',
      dead: 'dead'
    };
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.animationSpeed = 0.1;
    super.play();
  }

  left(textures) {
    this.activeStatus = 'left';
    this.textures = textures;
  }
  right() {}
  topLeft() {}
  topRight() {}
  dead() {}

  logicUpdate(delta) {
    this.x += this.vx;
    this.y += this.vy;
  }
}
