import { Sprite, Texture, Container, extras } from 'pixi.js';
const { AnimatedSprite } = extras;

import Math2 from '../utils/Math2';

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
    this.active = true;
    this.interactive = true;
    this.marginControl = true;
    this.speed = 3;
    this.marginControlOffSpeed = 4;
    this.stateUpdate(state);
    this.counter = 0;
    this.nextCounterChange = Math.floor(Math.random() * 50) + 50;
  }

  stateUpdate(newState) {
    this.state = newState;
    // rendering frame update
    this.textures = this.frames[this.state];
    this.play();
    // movement speed update
    const s = this.marginControl ? this.speed : this.marginControlOffSpeed;
    const speeds = {
      left: { vx: -s, vy: 0 },
      right: { vx: s, vy: 0 },
      topLeft: { vx: -s, vy: -s },
      topRight: { vx: s, vy: -s },
      bottomLeft: { vx: -s, vy: s },
      bottomRight: { vx: s, vy: s },
      leftDead: { vx: 0, vy: 6 },
      rightDead: { vx: 0, vy: 6 },
      shot: { vx: 0, vy: 0 }
    };

    this.vx = speeds[newState]['vx'];
    this.vy = speeds[newState]['vy'];
  }

  haveHitMe(point, radius) {
    if (this.state == 'rightDead' || this.state == 'leftDead') return false;

    if (
      Math2.distance(point, {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
      }) < radius
    ) {
      const lastState = this.state;
      this.stateUpdate('shot');
      setTimeout(() => {
        let nextStatus = 'rightDead';
        if (
          lastState === 'left' ||
          lastState === 'topLeft' ||
          lastState === 'bottomLeft'
        )
          nextStatus = 'leftDead';
        this.stateUpdate(nextStatus);
      }, 500);

      return true;
    }

    return false;
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
      let rnd = [
        'left',
        'right',
        'topLeft',
        'topRight',
        'bottomRight',
        'bottomLeft'
      ];

      rnd = rnd.filter(v => v !== this.state);
      this.stateUpdate(rnd[Math.floor(Math.random() * rnd.length)]);
      this.counter = 0;
      this.nextCounterChange = Math.floor(Math.random() * 50) + 50;
    }
  }

  checkMargin() {
    if (this.state == 'rightDead' || this.state == 'leftDead') return;

    if (!this.marginControl) {
      if (
        this.x < 0 - this.width ||
        this.y < 0 - this.height ||
        this.x > 800 ||
        this.y > 600 - this.height
      ) {
        this.visible = false;
        this.active = false;
        this.scene.mainContainer.emit(
          'duckescape',
          new Event('duckescape'),
          this.x,
          this.y
        );
      }
      return;
    }

    if (this.x <= 0) {
      this.stateUpdate('right');
    }
    if (this.x >= 800 - this.width) {
      this.stateUpdate('left');
    }
    if (this.y <= 0) {
      this.stateUpdate(
        Math2.randomInt(0, 2) == 0 ? 'bottomLeft' : 'bottomRight'
      );
    }
    if (this.y > 450) {
      this.stateUpdate(Math2.randomInt(0, 2) == 0 ? 'topLeft' : 'topRight');
    }
  }

  logicUpdate(delta) {
    this.randomState();
    this.checkMargin();
    this.emitDuckKill();
    this.x += this.vx;
    this.y += this.vy;
  }

  emitDuckKill() {
    if (
      this.y > 600 - this.height &&
      (this.state == 'rightDead' ||
        this.state == 'leftDead' ||
        this.state == 'shot')
    ) {
      // this.scene.mainContainer.emit('duckkill', new Event('duckkill'), this.x);
      this.visible = false;
      this.active = false;
    }
  }

  isActive() {
    return this.active;
  }
}
