import { Sprite, Texture, TextStyle, Graphics, Text } from 'pixi.js';
import Scene from './Scene.js';
import {
  WORLD_SIZE,
  ENDPOINT,
  DEFAULT_PLAYER_RADIUS
} from '../utils/AgarIOCostanzo.js';
import { Client } from 'colyseus.js';
import { State } from '../../agar-io-server/rooms/State';
import { lerp } from '@gamestdio/mathf';

export default class MainScene extends Scene {
  constructor(game, resources) {
    super(game, resources);

    this.client = new Client(ENDPOINT);
    this.room = this.client.join('arena', {});
    this.entities = {};
    this.currentPlayerEntity = undefined;
    this.init_();
  }

  update_(delta) {
    for (let id in this.entities) {
      this.entities[id].x = lerp(
        this.entities[id].x,
        this.room.state.entities[id].x,
        0.05
      );
      this.entities[id].y = lerp(
        this.entities[id].y,
        this.room.state.entities[id].y,
        0.05
      );
    }
  }

  destroy_() {
    this.viewport.destroy();
  }

  init_() {
    const boundaries = new Graphics();
    boundaries.beginFill(0x333333);
    boundaries.drawRoundedRect(0, 0, WORLD_SIZE, WORLD_SIZE, 30);
    this.viewport.addChild(boundaries);

    this.room.onJoin.add(() => {
      this.initializeSchema();
    });

    this.viewport.on('mousemove', e => {
      if (this.currentPlayerEntity) {
        const point = this.viewport.toLocal(e.data.global);
        this.room.send(['mouse', { x: point.x, y: point.y }]);
      }
    });
  }

  initializeSchema() {
    this.room.state.entities.onAdd = (entity, sessionId) => {
      const color = entity.radius < DEFAULT_PLAYER_RADIUS ? 0xff0000 : 0xffff0b;

      const graphics = new PIXI.Graphics();
      graphics.lineStyle(0);
      graphics.beginFill(color, 0.5);
      graphics.drawCircle(0, 0, entity.radius);
      graphics.endFill();

      graphics.x = entity.x;
      graphics.y = entity.y;
      this.viewport.addChild(graphics);

      this.entities[sessionId] = graphics;

      // detecting current user
      if (sessionId === this.room.sessionId) {
        this.currentPlayerEntity = graphics;
        this.viewport.follow(this.currentPlayerEntity);
      }

      entity.onChange = changes => {
        console.log('entity change: ', entity.x, entity.y);
        const color =
          entity.radius < DEFAULT_PLAYER_RADIUS ? 0xff0000 : 0xffff0b;
        const graphics = this.entities[sessionId];
        graphics.clear();
        graphics.lineStyle(0);
        graphics.beginFill(color, 0.5);
        graphics.drawCircle(0, 0, entity.radius);
        graphics.endFill();
      };
    };

    this.room.state.entities.onRemove = (_, sessionId) => {
      this.viewport.removeChild(this.entities[sessionId]);
      this.entities[sessionId].destroy();
      delete this.entities[sessionId];
    };
  }
}
