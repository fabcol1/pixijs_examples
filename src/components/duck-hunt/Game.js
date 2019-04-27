import { Application, utils } from 'pixi.js';
import ResourceLoader from './utils/ResourceLoader.js';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';

export default class Game {
  constructor(parentElement) {
    this.setup = this.setup.bind(this);
    this.changeScene = this.changeScene.bind(this);

    this.scenes = {};
    this.state = undefined;

    this.buildApp(parentElement);
    this.loadResources();

    // Resize all scenes on window resize event
    window.addEventListener('resize', e => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      for (let s in this.scenes) {
        this.scenes[s].container.width = this.app.screen.width;
        this.scenes[s].container.height = this.app.screen.height;
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
    this.app = new Application({
      width: 256,
      height: 256,
      antialias: true,
      transparent: false,
      resolution: 1
    });
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    //Add the canvas that Pixi automatically created for you to the HTML document
    parentElement.innerHTML = '';
    parentElement.appendChild(this.app.view);
  }

  loadResources() {
    ResourceLoader.loadResources(this.setup);
  }

  setup(loader, resources) {
    // create scenes
    this.createScene(new MainMenu(resources, this.changeScene), 'MM');
    this.createScene(new GameScene(resources, this.changeScene), 'GS');

    this.changeScene('MM');
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    this.state(delta);
  }

  createScene(scene, sceneName) {
    scene.container.width = this.app.screen.width;
    scene.container.height = this.app.screen.height;
    this.scenes[sceneName] = scene;
  }
  changeScene(sceneName) {
    this.scenes[sceneName].reset();
    this.app.stage.addChild(this.scenes[sceneName].container);
    this.state = this.scenes[sceneName].play;
  }
}
