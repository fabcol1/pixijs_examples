import { Sprite, Texture, TextStyle, Graphics, Text } from 'pixi.js';

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
    this.roundRectangle();
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
    bgColor.tint = 0x6fcbfc;
    this.mainContainer.addChild(bgColor);
  }

  roundRectangle() {
    const graphics = new Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRoundedRect(312.5, 127.5, 145, 95, 4); // drawRoundedRect(x, y, width, height, radius)
    graphics.beginFill(0x000);
    graphics.drawRoundedRect(315, 130, 140, 90, 4); // drawRoundedRect(x, y, width, height, radius)
    graphics.endFill();
    this.mainContainer.addChild(graphics);

    const style = new TextStyle({
      fontFamily: 'VT323',
      fontSize: 45,
      fill: 'white',
      align: 'center'
    });
    this.round = new Text(
      'LEVEL\n' + (1 + this.globalState.currentLevel),
      style
    );
    this.round.x = 340;
    this.round.y = 150;

    this.mainContainer.addChild(this.round);
  }
}
