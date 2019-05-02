import { Sprite, Texture, extras, Container } from 'pixi.js';

const { AnimatedSprite } = extras;

import Background from '../entities/Background.js';
import Scene from './Scene.js';

import DogAnimations from '../entities-layers/DogAnimations.js';

import Wave from '../entities-layers/Wave.js';
import Ducks from '../entities-layers/Ducks.js';

import GameSceneEventListenerController from '../event-listeners/GameSceneEventListenerController';

export default class GameScene extends Scene {
  constructor(resources, game) {
    super(resources, game);
    this.reset();
  }

  update_(delta) {
    this.ducks.update_(delta);
    this.dogAnimations.update_(delta);
  }

  destroy() {
    this.eventListenerController.removeEventListeners();
    this.mainContainer.removeChild(this.dogAnimations);
    this.mainContainer.removeChild(this.ducks);
    this.mainContainer.removeChild(this.background);
  }

  reset() {
    // EventListenerController
    this.eventListenerController = new GameSceneEventListenerController(this);
    this.eventListenerController.initEventListeners();

    // Layer 1
    this.bgColor();

    // Layer 2
    // Creazione di wave da globalState..
    // this.ducks = new Ducks(this);
    // this.ducks.generateWave();
    // this.mainContainer.addChild(this.ducks);

    this.ducks = new Wave(this, 30, 100000000);
    this.mainContainer.addChild(this.ducks);

    // Layer 3
    this.dogAnimations = new DogAnimations(this);
    this.mainContainer.addChild(this.dogAnimations);

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
