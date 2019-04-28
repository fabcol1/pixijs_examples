import Duck from './Duck.js';

export default class DuckBlack extends Duck {
  constructor(game, x, y, state) {
    const frames = {
      left: [
        game.resources.duckBlackLeft0.texture,
        game.resources.duckBlackLeft1.texture,
        game.resources.duckBlackLeft2.texture
      ],
      right: [
        game.resources.duckBlackRight0.texture,
        game.resources.duckBlackRight1.texture,
        game.resources.duckBlackRight2.texture
      ],
      topLeft: [
        game.resources.duckBlackTopLeft0.texture,
        game.resources.duckBlackTopLeft1.texture,
        game.resources.duckBlackTopLeft2.texture
      ],
      topRight: [
        game.resources.duckBlackTopRight0.texture,
        game.resources.duckBlackTopRight1.texture,
        game.resources.duckBlackTopRight2.texture
      ],
      shot: [],
      leftDead: [game.resources.duckBlackDead0.texture],
      rightDead: [game.resources.duckBlackDead1.texture]
    };
    super(game, x, y, state, frames);
  }
}
