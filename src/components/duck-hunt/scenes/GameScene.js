import { Sprite, Texture, extras, Container } from 'pixi.js';

const { AnimatedSprite } = extras;

import Background from '../entities/Background.js';
import Scene from './Scene.js';

import DogAnimations from '../entities-layers/DogAnimations.js';

import Wave from '../entities-layers/Wave.js';
import HUD from '../entities-layers/HUD';

import GameSceneEventListenerController from '../event-listeners/GameSceneEventListenerController';

export default class GameScene extends Scene {
  constructor(resources, game) {
    super(resources, game);
    this.bgColor = this.bgColorInstance(0x6fcbfc);
  }

  update_(delta) {
    this.ducks.update_(delta);
    this.dogAnimations.update_(delta);
    this.hud.update_(delta);
  }

  destroy() {
    this.eventListenerController.removeEventListeners();
    this.mainContainer.removeChild(this.dogAnimations);
    this.mainContainer.removeChild(this.ducks);
    this.mainContainer.removeChild(this.background);
    this.mainContainer.removeChild(this.hud);
  }

  reset() {
    const { currentLevel, levels } = this.game.globalState;
    this.game.globalState.currentWave++;
    this.nextWave(
      levels[currentLevel]['ducks'],
      levels[currentLevel]['duration']
    );
  }

  nextWave(nOfDucks, duration) {
    // EventListenerController
    this.eventListenerController = new GameSceneEventListenerController(this);
    this.eventListenerController.initEventListeners();

    // Layer 1
    this.bgColor = this.bgColorInstance(0x6fcbfc);

    // Layer 2
    // Creazione di wave da globalState..
    this.ducks = new Wave(this, nOfDucks, duration);
    this.mainContainer.addChild(this.ducks);

    // Layer 3
    this.dogAnimations = new DogAnimations(this);
    this.mainContainer.addChild(this.dogAnimations);

    // Layer 4
    this.background = new Background(this);
    this.mainContainer.addChild(this.background);

    // Layer 5 (HUD)
    this.hud = new HUD(this, nOfDucks);
    this.mainContainer.addChild(this.hud);
  }

  bgColorInstance(color) {
    const bgColor = new Sprite(Texture.WHITE);
    bgColor.height = 600;
    bgColor.width = 800;
    bgColor.tint = color;
    this.mainContainer.addChild(bgColor);
    return bgColor;
  }
}
