import { Container, Sprite, Texture, TextStyle, Text, Graphics } from 'pixi.js';

export default class HUD extends Container {
  constructor(scene, nOfBullets) {
    super();
    this.scene = scene;
    this.nOfBullets = nOfBullets;
    this.hitDucks = this.scene.globalState.hitDucks;
    this.missDucks = this.scene.globalState.missDucks;
    this.shot();
    this.score();
    this.ducksCounter();
  }

  update_(delta) {
    // this.nOfBulletsMessage.text = 'Bullets: ' + this.nOfBullets;
    // this.nOfhitDucksMessage.text =
    //   'Hit Ducks: ' + this.scene.globalState.hitDucks;
    // this.missDucksMessage.text =
    //   'Miss Ducks: ' + this.scene.globalState.missDucks;
    // this.pointsMessage.text = 'Points: ' + A;
    this.scoreUpdate();
    this.shotUpdate();
    this.ducksCounterUpdate();
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

  shot() {
    const graphics = new Graphics();
    graphics.lineStyle(4, 0xffffff, 1);
    graphics.beginFill(0x000);
    graphics.drawRoundedRect(15, 15, 65, 50, 4); // drawRoundedRect(x, y, width, height, radius)
    graphics.endFill();
    this.scene.mainContainer.addChild(graphics);

    this.bulletsSprite = [];
    this.origNOfBullets = this.nOfBullets;
    for (let i = 0; i < this.nOfBullets; i++) {
      let s = new Sprite(this.scene.resources.hudBullet.texture);
      s.x = 27 + s.width * i;
      s.y = 23;
      this.bulletsSprite.push(s);
      this.scene.mainContainer.addChild(this.bulletsSprite[i]);
    }

    const style = new TextStyle({
      fontFamily: 'VT323',
      fontSize: 30,
      fill: 0x6fcbfc,
      align: 'center'
    });
    this.round = new Text('SHOT', style);
    this.round.x = 25;
    this.round.y = 43;
    this.scene.mainContainer.addChild(this.round);
  }

  shotUpdate() {
    for (let i = this.nOfBullets; i < this.origNOfBullets; i++) {
      this.bulletsSprite[i].visible = false;
    }
  }

  ducksCounter() {
    const graphics = new Graphics();
    graphics.lineStyle(4, 0xffffff, 1);
    graphics.beginFill(0x000);
    graphics.drawRoundedRect(220, 15, 350, 35, 4); // drawRoundedRect(x, y, width, height, radius)
    graphics.endFill();
    this.scene.mainContainer.addChild(graphics);

    this.ducksSprite = [];
    this.originNOfDucks =
      this.scene.globalState.levels[this.scene.globalState.currentLevel][
        'ducks'
      ] *
      this.scene.globalState.levels[this.scene.globalState.currentLevel][
        'waves'
      ];
    for (let i = 0; i < this.originNOfDucks; i++) {
      let s = new Sprite(this.scene.resources.hudScoreLive.texture);
      s.x = 275 + s.width * i;
      s.y = 20;
      this.ducksSprite.push(s);
      this.scene.mainContainer.addChild(this.ducksSprite[i]);
    }
  }
  ducksCounterUpdate() {
    for (let i = 0; i < this.scene.globalState.hitDucks; i++) {
      this.ducksSprite[i].texture = this.scene.resources.hudScoreDead.texture;
    }
  }

  score() {
    const graphics = new Graphics();
    graphics.lineStyle(4, 0xffffff, 1);
    graphics.beginFill(0x000);
    graphics.drawRoundedRect(660, 15, 125, 50, 4); // drawRoundedRect(x, y, width, height, radius)
    graphics.endFill();
    this.scene.mainContainer.addChild(graphics);

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
    this.scene.mainContainer.addChild(this.scoreText);
  }

  scoreUpdate() {
    this.scoreText.text = this.scene.globalState.currentPoints + '\nSCORE';
  }
}
