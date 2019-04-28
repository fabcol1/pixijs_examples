import { Sprite, Texture } from 'pixi.js';

import Scene from './Scene.js';
import MainMenuEventListenerController from '../event-listeners/MainMenuEventListenerController.js';
import Background from '../entities/Background.js';
import DogAnimationBuilder from '../entities-layers/DogAnimationBuilder';

export default class MainMenu extends Scene {
  constructor(resources, changeScene) {
    super(resources, changeScene);
    this.reset();
  }

  update_(delta) {
    this.dogAnimationBuilder.update_(delta);
  }

  destroy() {
    this.eventListenerController.removeEventListeners();
    this.mainContainer.removeChild(this.background);
    this.mainContainer.removeChild(this.dogAnimationBuilder);
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
    this.dogAnimationBuilder = new DogAnimationBuilder(this);
    this.dogAnimationBuilder.dogEntryAnim(0, 470);
    this.mainContainer.addChild(this.dogAnimationBuilder);
  }

  bgColor() {
    const bgColor = new Sprite(Texture.WHITE);
    bgColor.height = 600;
    bgColor.width = 800;
    bgColor.tint = 0x89c4f4;
    this.mainContainer.addChild(bgColor);
  }
}
