import { Container, Sprite, Texture, TextStyle, Text } from 'pixi.js';

export default class HUD extends Container {
  constructor(scene, nOfBullets) {
    super();
    this.scene = scene;
    this.nOfBullets = nOfBullets;
    this.hitDucks = this.scene.globalState.hitDucks;
    this.missDucks = this.scene.globalState.missDucks;
    this.init_();
  }

  update_(delta) {
    this.nOfBulletsMessage.text = 'Bullets: ' + this.nOfBullets;
    this.nOfhitDucksMessage.text =
      'Hit Ducks: ' + this.scene.globalState.hitDucks;
    this.missDucksMessage.text =
      'Miss Ducks: ' + this.scene.globalState.missDucks;
    this.pointsMessage.text = 'Points: ' + this.scene.globalState.currentPoints;
  }

  init_() {
    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 15,
      fill: 'white',
      align: 'center'
    });
    this.nOfBulletsMessage = new Text('Bullets: ' + this.nOfBullets, style);
    this.nOfBulletsMessage.x = 10;
    this.nOfBulletsMessage.y = 10;
    this.addChild(this.nOfBulletsMessage);

    this.nOfhitDucksMessage = new Text('Hit Ducks: ' + this.hitDucks, style);
    this.nOfhitDucksMessage.x = 10;
    this.nOfhitDucksMessage.y = 30;
    this.addChild(this.nOfhitDucksMessage);

    this.missDucksMessage = new Text('Miss Ducks: ' + this.missDucks, style);
    this.missDucksMessage.x = 10;
    this.missDucksMessage.y = 50;
    this.addChild(this.missDucksMessage);

    this.pointsMessage = new Text(
      'Points: ' + this.scene.globalState.currentPoints,
      style
    );
    this.pointsMessage.x = 10;
    this.pointsMessage.y = 70;
    this.addChild(this.pointsMessage);
  }
}
