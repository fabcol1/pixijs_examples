import { Application, utils, Sprite, Texture } from 'pixi.js';
import Resources from './utils/Resources.js';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';
import GameOver from './scenes/GameOver.js';
import GameWin from './scenes/GameWin.js';
import levels from './utils/levels.json';
import WebFont from 'webfontloader';

import '../../styles/main.scss';

export default class Game {
  constructor(parentElement) {
    this.setup = this.setup.bind(this);
    this.changeScene = this.changeScene.bind(this);

    this.scene = undefined;
    this.currenScene = '';
    this.globalState = {
      levels,
      currentLevel: 0,
      currentWave: 0,
      currentPoints: 0,
      hitDucks: 0,
      missDucks: 0
    };

    // console.time('loading font');
    WebFont.load({
      google: {
        families: ['VT323', 'monospace']
      }
    });
    // console.timeEnd('loading font');

    this.app = this.buildApp(parentElement);
    this.loadResources();
    this.eventListenerInit();
  }

  eventListenerInit() {
    // Resize all scenes on window resize event
    window.addEventListener('resize', e => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      this.scene.mainContainer.width = this.app.screen.width;
      this.scene.mainContainer.height = this.app.screen.height;
      // for (let s in this.scenes) {
      //   this.scenes[s].mainContainer.width = this.app.screen.width;
      //   this.scenes[s].mainContainer.height = this.app.screen.height;
      // }

      // const bg = new Sprite(Texture.WHITE);
      // bg.height = window.innerHeight;
      // bg.width = window.innerWidth;
      // for (let s in this.scenes) {
      //   this.scenes[s].mainContainer.addChild(bg);
      // }

      // setTimeout(() => {
      //   for (let s in this.scenes) {
      //     this.scenes[s].mainContainer.removeChild(bg);
      //   }
      // }, 20);
    });
  }

  buildApp(parentElement) {
    let type = 'WebGL';
    if (!utils.isWebGLSupported()) {
      type = 'canvas';
    }
    utils.sayHello(type);
    //Create a Pixi Application
    let app = new Application({
      width: 256,
      height: 256,
      antialias: true,
      transparent: false,
      resolution: 1
    });
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    //Add the canvas that Pixi automatically created for you to the HTML document
    parentElement.innerHTML = '';
    parentElement.appendChild(app.view);

    return app;
  }

  loadResources() {
    Resources.loadResources(this.setup);
  }

  setup(loader, resources) {
    this.resources = resources;
    // create scenes
    // this.createScene(new MainMenu(resources, this), 'MM');
    // this.createScene(new GameScene(resources, this), 'GS');
    // this.createScene(new GameOver(resources, this), 'GO');
    // this.createScene(new GameOver(resources, this), 'GW');
    this.changeScene('MM');
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    this.scene.update_(delta);
  }

  createScene(scene, sceneName) {
    scene.mainContainer.width = this.app.screen.width;
    scene.mainContainer.height = this.app.screen.height;
    this.scene = scene;
    this.currenScene = sceneName;
  }

  changeScene(sceneName) {
    if (this.scene) {
      this.scene.destroy();
    }
    if (sceneName === 'MM') {
      this.createScene(new MainMenu(this.resources, this), sceneName);
    } else if (sceneName === 'GS') {
      this.createScene(new GameScene(this.resources, this), sceneName);
    } else if (sceneName === 'GO') {
      this.createScene(new GameOver(this.resources, this), sceneName);
      this.globalState = {
        levels,
        currentLevel: 0,
        currentWave: 0,
        currentPoints: 0,
        hitDucks: 0,
        missDucks: 0
      };
    } else if (sceneName === 'GW') {
      this.createScene(new GameWin(this.resources, this), sceneName);
      this.globalState = {
        levels,
        currentLevel: 0,
        currentWave: 0,
        currentPoints: 0,
        hitDucks: 0,
        missDucks: 0
      };
    }

    this.currenScene = sceneName;
    this.scene.reset();
    this.app.stage.addChild(this.scene.mainContainer);
  }
}
