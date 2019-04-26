import './styles/main.scss';

import Navigo from './utils/Navigo';

import NotFound from './components/NotFound';
import Game from './components/duck-hunt/Game';

const router = new Navigo(null, false, '#');
router
  .on({
    'duck-hunt': (query, parameter) => {
      new Game(document.body);
    },
    '*': (query, parameter) => {
      document.body.innerHTML = new NotFound().render();
    }
  })
  .resolve();
