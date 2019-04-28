import * as PIXI from 'pixi.js';

import KeyBoardKey from './KeyBoardKey.js';

import {
  scene_back_0,
  scene_tree_0
} from '../../static/duck_hunt_static/*.png';

//Aliases
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;

class DuckHunt {
  constructor(parentElement) {
    let type = 'WebGL';
    if (!PIXI.utils.isWebGLSupported()) {
      type = 'canvas';
    }
    PIXI.utils.sayHello(type);

    //Create a Pixi Application
    this.app = new Application({
      width: 256,
      height: 256,
      antialias: true,
      transparent: false,
      resolution: 1
    });

    this.app.renderer.backgroundColor = 0x89c4f4;
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    //Add the canvas that Pixi automatically created for you to the HTML document
    parentElement.innerHTML = '';
    parentElement.appendChild(this.app.view);

    //Load sprites and after loading initialize sprites on screen
    loader
      .add('sceneBack', scene_back_0)
      .add('sceneTree', scene_tree_0)
      .load(this.setup.bind(this));

    // this.gameLoop.bind(this);
    // this.play.bind(this);

    this.state = this.play;
  }

  setup(loader, resources) {
    let app = this.app;

    this.back = new Sprite(resources.sceneBack.texture);
    this.tree = new Sprite(resources.sceneTree.texture);

    let back = this.back;
    let tree = this.tree;
    tree.vx = 0;
    tree.vy = 0;

    this.left = new KeyBoardKey(
      'ArrowLeft',
      () => {
        this.tree.vx = -5;
        this.tree.vy = 0;
      },
      () => {
        if (!this.right.isDown && this.tree.vy === 0) {
          this.tree.vx = 0;
        }
      }
    );
    this.up = new KeyBoardKey(
      'ArrowUp',
      () => {
        this.tree.vy = -5;
        this.tree.vx = 0;
      },
      () => {
        if (!this.down.isDown && this.tree.vx === 0) {
          this.tree.vy = 0;
        }
      }
    );
    this.right = new KeyBoardKey(
      'ArrowRight',
      () => {
        this.tree.vx = 5;
        this.tree.vy = 0;
      },
      () => {
        if (!this.left.isDown && this.tree.vy === 0) {
          this.tree.vx = 0;
        }
      }
    );
    this.down = new KeyBoardKey(
      'ArrowDown',
      () => {
        this.tree.vy = 5;
        this.tree.vx = 0;
      },
      () => {
        if (!this.up.isDown && this.tree.vx === 0) {
          this.tree.vy = 0;
        }
      }
    );

    back.position.set(0, app.renderer.height - back.height);
    back.width = app.renderer.width;

    tree.position.set(
      app.renderer.width / 10,
      app.renderer.height - tree.height
    );

    app.stage.addChild(tree);
    app.stage.addChild(back);

    // this.gameLoop.apply(this);
    //Start the game loop by adding the `gameLoop` function to
    //Pixi's `ticker` and providing it with a `delta` argument.
    app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    // console.log(delta);
    //Update the current game state:
    this.state(delta);
  }

  play(delta) {
    //Update the cat's velocity
    // this.tree.vx = 1;
    // this.tree.vy = -1;
    //Apply the velocity values to the cat's
    //position to make it move
    this.tree.x += this.tree.vx;
    this.tree.y += this.tree.vy;
  }
}

export default DuckHunt;
