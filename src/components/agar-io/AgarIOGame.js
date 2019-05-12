import { Application, utils, Sprite, Texture } from 'pixi.js';
import Resources from './utils/Resources.js';
import '../../styles/main.scss';

import MainScene from './scenes/MainScene.js';

export default class AgarIOGame {
  constructor(parentElement) {
    // bind functions
    this.setup = this.setup.bind(this);
    this.sceneMultiplexer = this.sceneMultiplexer.bind(this);

    // initialization
    this.globalState = this.globalStateJson();
    this.app = this.buildApp(parentElement);
    this.scene = undefined;

    // start game
    Resources.loadResources(this.setup);
    this.eventListenerInit();
  }

  eventListenerInit() {
    // Resize all scenes on window resize event
    window.addEventListener('resize', e => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    });
  }

  globalStateJson() {
    return {};
  }

  buildApp(parentElement) {
    let type = 'WebGL';
    if (!utils.isWebGLSupported()) {
      type = 'canvas';
    }
    utils.sayHello(type);
    //Create a Pixi Application
    let app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x0c0c0c
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

  setup(loader, resources) {
    this.resources = resources;
    this.sceneMultiplexer('MS');
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    if (this.scene !== undefined) this.scene.update_(delta);
  }

  sceneMultiplexer(sceneName) {
    if (this.scene) {
      this.app.stage.removeChild(this.scene.viewport);
      this.scene.destroy_();
    }

    let newScene = undefined;

    if (sceneName === 'MS') {
      newScene = new MainScene(this, this.resources);
    }

    if (newScene !== undefined) {
      this.scene = newScene;
      this.app.stage.addChild(this.scene.viewport);
    }
  }
}
