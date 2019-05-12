import { Schema, type } from '@colyseus/schema';

export class Entity extends Schema {
  @type('number') x: number;
  @type('number') y: number;
  @type('number') radius: number;

  dead: boolean = false;
  angle: number = 0;
  speed = 0;

  constructor(x: number, y: number, radius: number) {
    super();

    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  distance(a: Entity) {
    return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2));
  }
}
