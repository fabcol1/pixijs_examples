import { loader } from 'pixi.js';
import { hud_score_live_0 } from '../../../static/duck_hunt_static/*.png';

export default class Resources {
  static loadResources(setup) {
    loader.add('hudScoreLive', hud_score_live_0).load(setup);
  }
}
