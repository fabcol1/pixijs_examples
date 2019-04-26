import { loader } from 'pixi.js';
import {
  scene_back_0,
  scene_tree_0,
  dog_sniff_0,
  dog_sniff_1,
  dog_sniff_2,
  dog_sniff_3,
  dog_sniff_4
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
      .load(setup);
  }
}
