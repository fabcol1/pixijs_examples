import { Sprite, Texture, extras, Container } from 'pixi.js';

const { AnimatedSprite } = extras;

import Background from '../entities/Background.js';
import Scene from './Scene.js';

import DogAnimationBuilder from '../entities-layers/DogAnimationBuilder.js';
import Ducks from '../entities-layers/Ducks.js';

import GameSceneEventListenerController from '../event-listeners/GameSceneEventListenerController';

export default class GameScene extends Scene {
  constructor(resources, changeScene) {
    super(resources, changeScene);
    this.reset();
  }

  update_(delta) {
    this.ducks.update_(delta);
    this.dogAnimationBuilder.update_(delta);
  }

  destroy() {
    this.eventListenerController.removeEventListeners();
    this.mainContainer.removeChild(this.dogAnimationBuilder);
    this.mainContainer.removeChild(this.background);
  }

  reset() {
    // EventListenerController
    this.eventListenerController = new GameSceneEventListenerController(this);
    this.eventListenerController.initEventListeners();

    // Layer 1
    this.bgColor();

    // Layer 2
    this.ducks = new Ducks(this);
    this.ducks.generateWave();

    // Layer 3
    this.dogAnimationBuilder = new DogAnimationBuilder(this);
    this.mainContainer.addChild(this.dogAnimationBuilder);

    // Layer 4
    this.background = new Background(this);
    this.mainContainer.addChild(this.background);
  }

  bgColor() {
    const bgColor = new Sprite(Texture.WHITE);
    bgColor.height = 600;
    bgColor.width = 800;
    bgColor.tint = 0x89c4f4;
    this.mainContainer.addChild(bgColor);
  }
}
