import { Sprite, Texture, TextStyle, Text } from 'pixi.js';
import Scene from './Scene.js';
import GameOverEventListenerController from '../event-listeners/GameOverEventListenerController.js';
import Background from '../entities/Background.js';

export default class MainMenu extends Scene {
  constructor(resources, game) {
    super(resources, game);
    this.reset();
  }

  update_(delta) {}

  destroy() {
    this.eventListenerController.removeEventListeners();
    this.mainContainer.removeChild(this.background);
  }

  reset() {
    // EventListenerController
    this.eventListenerController = new GameOverEventListenerController(this);
    this.eventListenerController.initEventListeners();
    // Layer 1
    this.bgColor();
    // Layer 2
    this.background = new Background(this);
    this.mainContainer.addChild(this.background);
    // Layer 3
    this.message();
  }

  message() {
    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 42,
      fill: 'white',
      align: 'center',
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 1,
      dropShadowAngle: Math.PI / 10,
      dropShadowDistance: 3
    });
    const message = new Text(
      'Congratulations, you have win!\nplay again?',
      style
    );
    message.x = 400 - message.width / 2;
    message.y = 300 - message.height / 2;
    this.mainContainer.addChild(message);
  }
  bgColor() {
    const bgColor = new Sprite(Texture.WHITE);
    bgColor.height = 600;
    bgColor.width = 800;
    bgColor.tint = 0x6fcbfc;
    this.mainContainer.addChild(bgColor);
  }
}
