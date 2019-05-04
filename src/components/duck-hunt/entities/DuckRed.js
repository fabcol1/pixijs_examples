import Duck from './Duck.js';

export default class DuckRed extends Duck {
  constructor(game, x, y, state) {
    const frames = {
      left: [
        game.resources.duckRedLeft0.texture,
        game.resources.duckRedLeft1.texture,
        game.resources.duckRedLeft2.texture
      ],
      right: [
        game.resources.duckRedRight0.texture,
        game.resources.duckRedRight2.texture
      ],
      topLeft: [
        game.resources.duckRedTopLeft0.texture,
        game.resources.duckRedTopLeft1.texture,
        game.resources.duckRedTopLeft2.texture
      ],
      bottomRight: [
        game.resources.duckRedTopRight0.texture,
        game.resources.duckRedTopRight1.texture,
        game.resources.duckRedTopRight2.texture
      ],
      bottomLeft: [
        game.resources.duckRedTopLeft0.texture,
        game.resources.duckRedTopLeft1.texture,
        game.resources.duckRedTopLeft2.texture
      ],
      topRight: [
        game.resources.duckRedTopRight0.texture,
        game.resources.duckRedTopRight1.texture,
        game.resources.duckRedTopRight2.texture
      ],
      shot: [game.resources.duckRedShot.texture],
      dead: [
        game.resources.duckRedDead0.texture,
        game.resources.duckRedDead1.texture
      ]
    };

    super(game, x, y, state, frames);
  }
}
