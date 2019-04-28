import { Sprite, Texture, Container, extras } from 'pixi.js';
const { AnimatedSprite } = extras;

export default class Duck extends AnimatedSprite {
  constructor(scene, x, y, state, frames) {
    super(frames[state]);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.animationSpeed = 0.15;
    this.state = state;
    this.frames = frames;
    this.logics = {
      left: this.left.bind(this),
      right: this.right.bind(this),
      topLeft: this.topLeft.bind(this),
      topRight: this.topRight.bind(this),
      shot: this.shot.bind(this),
      leftDead: this.leftDead.bind(this),
      rightDead: this.rightDead.bind(this)
    };
    super.play();
    this.killEvent = this.killEvent.bind(this);
    this.interactive = true;
    this.removeAllListeners();
    this.on('pointerdown', e => {
      if (this.state == 'rightDead' || this.state == 'leftDead') return;
      const lastState = this.state;
      this.stateUpdate('shot');
      setTimeout(() => {
        this.killEvent(lastState);
      }, 500);
    });

    this.counter = 0;
    this.nextCounterChange = Math.floor(Math.random() * 50) + 50;
  }

  killEvent(lastState) {
    let nextStatus = 'rightDead';
    if (lastState === 'left' || lastState === 'topLeft')
      nextStatus = 'leftDead';

    this.stateUpdate(nextStatus);
  }
  stateUpdate(newState) {
    this.state = newState;
    this.textures = this.frames[this.state];
    this.play();
  }

  left() {
    this.vx = -3;
    this.vy = 0;
  }
  right() {
    this.vx = 3;
    this.vy = 0;
  }
  topLeft() {
    this.vx = -3;
    this.vy = -3;
  }
  topRight() {
    this.vx = 3;
    this.vy = -3;
  }

  leftDead() {
    this.vx = 0;
    this.vy = 6;
  }
  rightDead() {
    this.leftDead();
  }

  shot() {
    this.vx = 0;
    this.vy = 0;
  }
  randomState() {
    if (
      this.state == 'rightDead' ||
      this.state == 'leftDead' ||
      this.state == 'shot'
    )
      return;
    this.counter++;
    if (this.counter >= this.nextCounterChange) {
      let rnd = ['left', 'right', 'topLeft', 'topRight'];
      rnd = rnd.filter(v => v !== this.state);
      this.stateUpdate(rnd[Math.floor(Math.random() * rnd.length)]);
      this.counter = 0;
      this.nextCounterChange = Math.floor(Math.random() * 50) + 50;
    }
  }

  isActive() {
    if (this.y > 600 - this.height || this.y < 0 - this.height) {
      if (this.y > 600 - this.height) {
        this.scene.mainContainer.emit(
          'duckkill',
          new Event('duckkill'),
          this.x
        );
      }
      return false;
    }
    return true;
  }

  checkMargin() {
    if (this.x <= 0) {
      this.stateUpdate('right');
    }
    if (this.x >= 800 - this.width) {
      this.stateUpdate('left');
    }
  }

  logicUpdate(delta) {
    this.logics[this.state]();
    this.randomState();
    this.checkMargin();
    this.x += this.vx;
    this.y += this.vy;
  }
}
