import './styles/main.scss';

import Navigo from './utils/Navigo';

import NotFound from './components/NotFound';
import DuckHunt from './components/duck-hunt/DuckHunt';

const router = new Navigo(null, false, '#');
router
  .on({
    'duck-hunt': (query, parameter) => {
      new DuckHunt();
    },
    '*': (query, parameter) => {
      document.body.innerHTML = new NotFound().render();
    }
  })
  .resolve();
