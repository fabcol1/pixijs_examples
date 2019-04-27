import { Sprite, Texture, Container, extras } from 'pixi.js';
const { AnimatedSprite } = extras;

export default class DogEntryAnimation extends Container {
  constructor(resources) {
    super();
    this.resources = resources;

    this.sniff = this.sniff.bind(this);
    this.find = this.find.bind(this);
    this.jump = this.jump.bind(this);
    this.isOver = this.isOver.bind(this);

    this.status = 'sniff';
    this.play = {
      sniff: this.sniff,
      jump: this.jump,
      isOver: this.isOver
    };

    const dogSniffFrames = [
      resources.dogSniff0.texture,
      resources.dogSniff1.texture,
      resources.dogSniff2.texture,
      resources.dogSniff3.texture,
      resources.dogSniff4.texture
    ];
    this.dogSniff = new AnimatedSprite(dogSniffFrames);
    this.dogSniff.x = 0;
    this.dogSniff.y = 470;
    this.dogSniff.vx = 2.5;
    this.dogSniff.vy = 0;
    this.dogSniff.animationSpeed = 0.1;
    this.dogSniff.play();

    const dogJumpFrames = [
      resources.dogJump0.texture,
      resources.dogJump1.texture
    ];
    this.dogJump = new AnimatedSprite(dogJumpFrames);
    this.dogJump.x = 321;
    this.dogJump.y = 440;
    this.dogJump.vx = 0;
    this.dogJump.vy = -3;
    this.dogJump.animationSpeed = 0.1;
    this.dogJump.loop = false;
    this.dogJump.visible = false;
    this.dogJump.onComplete = () => {
      this.removeChild(this.dogJump);
      this.status = 'isOver';
    };

    this.addChild(this.dogSniff);
  }

  sniff(delta) {
    if (this.dogSniff.x < 320) {
      this.dogSniff.x += this.dogSniff.vx;
    } else if (this.dogSniff.x === 320) {
      this.dogSniff.x++;
      this.removeChild(this.dogSniff);
      this.find();
    }
  }

  find() {
    const dogFind = new Sprite(this.resources.dogFind.texture);
    dogFind.x = 320;
    dogFind.y = 470;
    this.addChild(dogFind);
    setTimeout(() => {
      this.removeChild(dogFind);
      this.status = 'jump';
      this.dogJump.visible = true;
      this.dogJump.play();
      this.addChild(this.dogJump);
    }, 500);
  }

  jump(delta) {
    this.dogJump.y += this.dogJump.vy;
  }

  isOver(delta) {
    return true;
  }
}
