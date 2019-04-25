import * as PIXI from 'pixi.js';
import dog_double_0 from '../../static/duck_hunt_static/dog_double_0.png';

class DuckHunt {
  constructor() {
    let type = 'WebGL';
    if (!PIXI.utils.isWebGLSupported()) {
      type = 'canvas';
    }

    PIXI.utils.sayHello(type);
    //Aliases
    let Application = PIXI.Application,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite;

    //Create a Pixi Application
    let app = new Application({
      width: 256,
      height: 256,
      antialias: true,
      transparent: false,
      resolution: 1
    });
    app.renderer.backgroundColor = 0x89c4f4;
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // window.addEventListener('resize', e => {
    //   app.renderer.resize(window.innerWidth, window.innerHeight);
    //   setup();
    // });

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);
    console.log(dog_double_0);
    loader.add('dog_double_0', dog_double_0).load(setup);

    function setup(loader, resources) {
      let dog_double_0_sprite = new Sprite(resources.dog_double_0.texture);
      app.stage.addChild(dog_double_0_sprite);

      // let back = new Sprite(id['scene/back/0.png']);
      // // back.width = 100;
      // back.position.set(0, app.renderer.height - back.height);
      // back.width = app.renderer.width;
      // app.stage.addChild(back);

      // let dog = new Sprite(id['dog/double/0.png']);

      // dog.position.set(96, 96);
      // dog.anchor.x = 0.5;
      // dog.anchor.y = 0.5;

      // app.stage.addChild(dog);
    }
  }
}

export default DuckHunt;
