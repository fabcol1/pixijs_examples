import { Sprite, Texture, TextStyle, Text, Graphics } from 'pixi.js';
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
    this.score();
  }

  message() {
    const graphics = new Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRoundedRect(312.5, 127.5, 210, 95, 4); // drawRoundedRect(x, y, width, height, radius)
    graphics.beginFill(0x000);
    graphics.drawRoundedRect(315, 130, 205, 90, 4); // drawRoundedRect(x, y, width, height, radius)
    graphics.endFill();
    this.mainContainer.addChild(graphics);

    const style = new TextStyle({
      fontFamily: 'VT323',
      fontSize: 45,
      fill: 'white',
      align: 'center'
    });
    this.round = new Text('GAME WIN', style);
    this.round.x = 340;
    this.round.y = 150;

    this.mainContainer.addChild(this.round);
  }
  bgColor() {
    const bgColor = new Sprite(Texture.WHITE);
    bgColor.height = 600;
    bgColor.width = 800;
    bgColor.tint = 0x6fcbfc;
    this.mainContainer.addChild(bgColor);
  }
  score() {
    const graphics = new Graphics();
    graphics.lineStyle(4, 0xffffff, 1);
    graphics.beginFill(0x000);
    graphics.drawRoundedRect(660, 15, 125, 50, 4); // drawRoundedRect(x, y, width, height, radius)
    graphics.endFill();
    this.scene.addChild(graphics);

    const style = new TextStyle({
      fontFamily: 'VT323',
      fontSize: 30,
      fill: 'white',
      align: 'center'
    });
    this.scoreText = new Text(
      this.scene.globalState.currentPoints + '\nSCORE',
      style
    );
    this.scoreText.x = 693;
    this.scoreText.y = 23;
    this.scene.addChild(this.scoreText);
  }
}
