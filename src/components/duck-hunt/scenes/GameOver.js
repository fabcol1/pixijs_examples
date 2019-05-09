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
    this.mainContainer.removeChild(this.graphics);
    this.mainContainer.removeChild(this.round);
    this.mainContainer.removeChild(this.scoreGraphics);
    this.mainContainer.removeChild(this.scoreText);
    this.mainContainer.removeChild(this.bgColor);
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
    this.gameOverMessage();
    this.score();
  }

  gameOverMessage() {
    this.graphics = new Graphics();
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRoundedRect(312.5, 127.5, 215, 95, 4); // drawRoundedRect(x, y, width, height, radius)
    this.graphics.beginFill(0x000);
    this.graphics.drawRoundedRect(315, 130, 210, 90, 4); // drawRoundedRect(x, y, width, height, radius)
    this.graphics.endFill();
    this.mainContainer.addChild(this.graphics);
    const style = new TextStyle({
      fontFamily: 'VT323',
      fontSize: 45,
      fill: 'white',
      align: 'center'
    });
    this.round = new Text('GAME OVER', style);
    this.round.x = 340;
    this.round.y = 150;
    this.mainContainer.addChild(this.round);
  }

  score() {
    this.scoreGraphics = new Graphics();
    this.scoreGraphics.lineStyle(4, 0xffffff, 1);
    this.scoreGraphics.beginFill(0x000);
    this.scoreGraphics.drawRoundedRect(660, 15, 125, 50, 4); // drawRoundedRect(x, y, width, height, radius)
    this.scoreGraphics.endFill();
    this.mainContainer.addChild(this.scoreGraphics);
    const style = new TextStyle({
      fontFamily: 'VT323',
      fontSize: 30,
      fill: 'white',
      align: 'center'
    });
    this.scoreText = new Text(
      this.globalState.currentPoints + '\nSCORE',
      style
    );
    this.scoreText.x = 693;
    this.scoreText.y = 23;
    this.mainContainer.addChild(this.scoreText);
  }

  bgColor() {
    this.bgColor = new Sprite(Texture.WHITE);
    this.bgColor.height = 600;
    this.bgColor.width = 800;
    this.bgColor.tint = 0x6fcbfc;
    this.mainContainer.addChild(this.bgColor);
  }
}
