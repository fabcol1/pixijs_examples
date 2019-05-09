import EventListenerController from './EventListenerController';

export default class GameOverEventListenerController extends EventListenerController {
  constructor(scene) {
    super();
    this.scene = scene;
  }
  initEventListeners() {
    this.scene.mainContainer.removeAllListeners();
    this.scene.mainContainer.interactive = true;
    this.scene.mainContainer.on('pointerdown', e => {
      this.scene.destroy();
      this.scene.sceneMultiplexer('MM');
    });
  }
  removeEventListeners() {
    this.scene.mainContainer.removeAllListeners();
  }
}
