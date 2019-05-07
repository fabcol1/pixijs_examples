import { extras } from 'pixi.js';
const { AnimatedSprite } = extras;

export default class DogEntry extends AnimatedSprite {
  constructor(scene, x, y) {
    const frames = {
      sniff: [
        scene.resources.dogSniff0.texture,
        scene.resources.dogSniff1.texture,
        scene.resources.dogSniff2.texture,
        scene.resources.dogSniff3.texture,
        scene.resources.dogSniff4.texture
      ],
      jump: [
        scene.resources.dogJump0.texture,
        scene.resources.dogJump1.texture
      ],
      find: [scene.resources.dogFind.texture]
    };
    super(frames['sniff']);
    this.scene = scene;
    this.frames = frames;
    this.x = x;
    this.y = y;
    this.vx = 3.5;
    this.vy = 0;
    this.animationSpeed = 0.1;
    this.play();
    this.status = 'sniff';
  }

  update_(delta) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x >= 320 && this.status === 'sniff') {
      this.vx = 0;
      this.vy = 0;
      this.status = 'find';
      this.textures = this.frames['find'];
      this.play();
      setTimeout(() => {
        this.status = 'jump';
        this.y = 470;
        this.vy = -3;
        this.textures = this.frames['jump'];
        this.play();
        this.loop = false;
        this.onComplete = () => {
          this.vx = 0;
          this.vy = 0;
          this.visible = false;
          this.scene.mainContainer.emit('dog-sniff-over');
        };
      }, 500);
    }
  }

  onComplete() {}
}
