import { Container } from 'pixi.js';

import EventListenerController from '../event-listeners/EventListenerController';

export default class Scene {
  constructor(resources, game) {
    this.game = game;
    this.globalState = this.game.globalState;
    this.sceneMultiplexer = this.game.sceneMultiplexer;
    this.update_ = this.update_.bind(this);
    this.destroy = this.destroy.bind(this);
    this.reset = this.reset.bind(this);
    this.mainContainer = new Container();
    this.eventListenerController = new EventListenerController();
    this.resources = resources;
  }

  update_(delta) {
    throw new Error('You have to implement the method update_(delta)!');
  }
  destroy() {
    throw new Error('You have to implement the method destory()!');
  }
  reset() {
    throw new Error('You have to implement the method reset()!');
  }
}
