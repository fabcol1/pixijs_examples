import * as VP from 'pixi-viewport';
const Viewport = VP.default;

import EventListenerController from '../events/EventListenerController';
import { WORLD_SIZE } from '../utils/AgarIOCostanzo.js';

export default class Scene {
  constructor(game, resources) {
    // bind
    this.init_ = this.init_.bind(this);
    this.update_ = this.update_.bind(this);
    this.destroy_ = this.destroy_.bind(this);

    this.game = game;
    this.globalState = this.game.globalState;
    this.sceneMultiplexer = this.game.sceneMultiplexer;

    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: WORLD_SIZE,
      worldHeight: WORLD_SIZE
    });

    this.eventListenerController = new EventListenerController();
    this.resources = resources;
  }

  init_() {
    throw new Error('You have to implement the method init_()!');
  }
  update_(delta) {
    throw new Error('You have to implement the method update_(delta)!');
  }
  destroy_() {
    throw new Error('You have to implement the method destory_()!');
  }
}
