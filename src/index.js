import './styles/main.scss';

import Navigo from './utils/Navigo';

import NotFound from './components/NotFound';
import DuckHuntGame from './components/duck-hunt/DuckHuntGame';
import AgarIOGame from './components/agar-io/AgarIOGame';

const router = new Navigo(null, false, '#');
router
  .on({
    'duck-hunt': (query, parameter) => {
      new DuckHuntGame(document.body);
    },
    'agar-io': (query, parameter) => {
      new AgarIOGame(document.body);
    },
    '*': (query, parameter) => {
      document.body.innerHTML = new NotFound().render();
    }
  })
  .resolve();
