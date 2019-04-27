import { loader } from 'pixi.js';
import {
  scene_back_0,
  scene_tree_0,
  dog_sniff_0,
  dog_sniff_1,
  dog_sniff_2,
  dog_sniff_3,
  dog_sniff_4,
  dog_find_0,
  dog_jump_0,
  dog_jump_1,
  duck_black_dead_0,
  duck_black_dead_1,
  duck_black_dead_2,
  duck_red_dead_0,
  duck_red_dead_1,
  duck_red_dead_2
} from '../../../static/duck_hunt_static/*.png';

export default class ResourceLoader {
  static loadResources(setup) {
    loader
      .add('sceneBack', scene_back_0)
      .add('sceneTree', scene_tree_0)
      .add('dogSniff0', dog_sniff_0)
      .add('dogSniff1', dog_sniff_1)
      .add('dogSniff2', dog_sniff_2)
      .add('dogSniff3', dog_sniff_3)
      .add('dogSniff4', dog_sniff_4)
      .add('dogFind', dog_find_0)
      .add('dogJump0', dog_jump_0)
      .add('dogJump1', dog_jump_1)
      .add('duckBlackDead0', duck_black_dead_0)
      .add('duckBlackDead1', duck_black_dead_1)
      .add('duckBlackDead2', duck_black_dead_2)
      .add('duckRedDead0', duck_red_dead_0)
      .add('duckRedDead1', duck_red_dead_1)
      .add('duckRedDead2', duck_red_dead_2)
      .load(setup);
  }
}
