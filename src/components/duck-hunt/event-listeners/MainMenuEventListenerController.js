import EventListenerController from './EventListenerController';

export default class MainMenuEventListenerController extends EventListenerController {
  constructor(scene) {
    super();
    this.scene = scene;
  }
  initEventListeners() {
    this.scene.mainContainer.removeAllListeners();
    this.scene.mainContainer.on('dog-sniff-over', e => {
      setTimeout(() => {
        this.scene.destroy();
        this.scene.changeScene('GS');
      }, 400);
    });
  }
  removeEventListeners() {
    this.scene.mainContainer.removeAllListeners();
  }
}
