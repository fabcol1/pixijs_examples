import { Sprite, Texture } from 'pixi.js';

import Scene from './Scene.js';
import MainMenuEventListenerController from '../event-listeners/MainMenuEventListenerController.js';
import Background from '../entities/Background.js';
import DogAnimations from '../entities-layers/DogAnimations.js';

export default class MainMenu extends Scene {
  constructor(resources, game) {
    super(resources, game);
    this.reset();
  }

  update_(delta) {
    this.dogAnimations.update_(delta);
  }

  destroy() {
    this.eventListenerController.removeEventListeners();
    this.mainContainer.removeChild(this.background);
    this.mainContainer.removeChild(this.dogAnimations);
  }

  reset() {
    // EventListenerController
    this.eventListenerController = new MainMenuEventListenerController(this);
    this.eventListenerController.initEventListeners();
    // Layer 1
    this.bgColor();
    // Layer 2
    this.background = new Background(this);
    this.mainContainer.addChild(this.background);
    // Layer 3
    this.dogAnimations = new DogAnimations(this);
    this.dogAnimations.dogEntryAnim(0, 470);
    this.mainContainer.addChild(this.dogAnimations);
  }

  bgColor() {
    const bgColor = new Sprite(Texture.WHITE);
    bgColor.height = 600;
    bgColor.width = 800;
    bgColor.tint = 0x89c4f4;
    this.mainContainer.addChild(bgColor);
  }
}
