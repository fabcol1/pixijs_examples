import { Application, utils } from 'pixi.js';
import ResourceLoader from './utils/ResourceLoader.js';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';
import GameOver from './scenes/GameOver.js';

export default class Game {
  constructor(parentElement) {
    this.setup = this.setup.bind(this);
    this.changeScene = this.changeScene.bind(this);

    this.scenes = {};
    this.currenScene = '';

    this.app = this.buildApp(parentElement);
    this.loadResources();
    this.eventListenerInit();
  }

  eventListenerInit() {
    // Resize all scenes on window resize event
    window.addEventListener('resize', e => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      for (let s in this.scenes) {
        this.scenes[s].mainContainer.width = this.app.screen.width;
        this.scenes[s].mainContainer.height = this.app.screen.height;
      }
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
    ResourceLoader.loadResources(this.setup);
  }

  setup(loader, resources) {
    // create scenes
    this.createScene(new MainMenu(resources, this.changeScene), 'MM');
    this.createScene(new GameScene(resources, this.changeScene), 'GS');
    this.createScene(new GameOver(resources, this.changeScene), 'GO');

    this.changeScene('MM');
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    this.scenes[this.currenScene].update_(delta);
  }

  createScene(scene, sceneName) {
    scene.mainContainer.width = this.app.screen.width;
    scene.mainContainer.height = this.app.screen.height;
    this.scenes[sceneName] = scene;
    this.currenScene = sceneName;
  }
  changeScene(sceneName) {
    this.currenScene = sceneName;
    this.scenes[sceneName].reset();
    this.app.stage.addChild(this.scenes[sceneName].mainContainer);
  }
}
