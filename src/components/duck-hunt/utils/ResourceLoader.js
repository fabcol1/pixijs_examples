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
  duck_black_shot_0,
  duck_black_dead_0,
  duck_black_dead_1,
  duck_black_dead_2,
  duck_black_left_0,
  duck_black_left_1,
  duck_black_left_2,
  duck_black_right_0,
  duck_black_right_1,
  duck_black_right_2,
  duck_black_top_left_0,
  duck_black_top_left_1,
  duck_black_top_left_2,
  duck_black_top_right_0,
  duck_black_top_right_1,
  duck_black_top_right_2,
  duck_red_dead_0,
  duck_red_dead_1,
  duck_red_dead_2,
  duck_red_shot_0,
  duck_red_left_0,
  duck_red_left_1,
  duck_red_left_2,
  duck_red_right_0,
  duck_red_right_2,
  duck_red_top_left_0,
  duck_red_top_left_1,
  duck_red_top_left_2,
  duck_red_top_right_0,
  duck_red_top_right_1,
  duck_red_top_right_2,
  dog_single_0
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
      .add('duckBlackShot', duck_black_shot_0)
      .add('duckBlackDead0', duck_black_dead_0)
      .add('duckBlackDead1', duck_black_dead_1)
      .add('duckBlackDead2', duck_black_dead_2)
      .add('duckBlackLeft0', duck_black_left_0)
      .add('duckBlackLeft1', duck_black_left_1)
      .add('duckBlackLeft2', duck_black_left_2)
      .add('duckBlackRight0', duck_black_right_0)
      .add('duckBlackRight1', duck_black_right_1)
      .add('duckBlackRight2', duck_black_right_2)
      .add('duckBlackTopLeft0', duck_black_top_left_0)
      .add('duckBlackTopLeft1', duck_black_top_left_1)
      .add('duckBlackTopLeft2', duck_black_top_left_2)
      .add('duckBlackTopRight0', duck_black_top_right_0)
      .add('duckBlackTopRight1', duck_black_top_right_1)
      .add('duckBlackTopRight2', duck_black_top_right_2)
      .add('duckRedShot', duck_red_shot_0)
      .add('duckRedDead0', duck_red_dead_0)
      .add('duckRedDead1', duck_red_dead_1)
      .add('duckRedDead2', duck_red_dead_2)
      .add('duckRedLeft0', duck_red_left_0)
      .add('duckRedLeft1', duck_red_left_1)
      .add('duckRedLeft2', duck_red_left_2)
      .add('duckRedRight0', duck_red_right_0)
      .add('duckRedRight2', duck_red_right_2)
      .add('duckRedTopLeft0', duck_red_top_left_0)
      .add('duckRedTopLeft1', duck_red_top_left_1)
      .add('duckRedTopLeft2', duck_red_top_left_2)
      .add('duckRedTopRight0', duck_red_top_right_0)
      .add('duckRedTopRight1', duck_red_top_right_1)
      .add('duckRedTopRight2', duck_red_top_right_2)
      .add('dogSingle', dog_single_0)
      .load(setup);
  }
}
