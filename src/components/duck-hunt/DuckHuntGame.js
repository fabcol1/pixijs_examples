import { Application, utils, Sprite, Texture } from 'pixi.js';
import Resources from './utils/Resources.js';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';
import GameOver from './scenes/GameOver.js';
import GameWin from './scenes/GameWin.js';
import levels from './utils/levels.json';
import WebFont from 'webfontloader';

import '../../styles/main.scss';

export default class DuckHuntGame {
  constructor(parentElement) {
    this.setup = this.setup.bind(this);
    this.sceneMultiplexer = this.sceneMultiplexer.bind(this);
    this.scene = undefined;
    this.globalState = this.globalStateJson();

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
    });
  }

  globalStateJson() {
    return {
      levels,
      currentLevel: 0,
      currentWave: 0,
      currentPoints: 0,
      hitDucks: 0,
      missDucks: 0
    };
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
    this.sceneMultiplexer('MM');
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    this.scene.update_(delta);
  }

  commonSceneSetup(scene) {
    scene.mainContainer.width = this.app.screen.width;
    scene.mainContainer.height = this.app.screen.height;
    this.scene = scene;
  }

  sceneMultiplexer(sceneName) {
    if (this.scene) {
      this.app.stage.removeChild(this.scene.mainContainer);
      this.scene.destroy();
    }
    if (sceneName === 'MM') {
      this.commonSceneSetup(new MainMenu(this.resources, this));
    } else if (sceneName === 'GS') {
      this.commonSceneSetup(new GameScene(this.resources, this));
    } else if (sceneName === 'GO') {
      this.commonSceneSetup(new GameOver(this.resources, this));
      this.globalState = this.globalStateJson();
    } else if (sceneName === 'GW') {
      this.commonSceneSetup(new GameWin(this.resources, this));
      this.globalState = this.globalStateJson();
    }
    this.app.stage.addChild(this.scene.mainContainer);
  }
}
