import CartScreen from './screens/CartScreen';
import Error404Screen from './screens/Error404Screen';
import mealScreen from './screens/MealScreen';
import homeScreen from './screens/HomeScreen';
// import SigninScreen from './screens/SigninScreen';
import { parseRequestURL } from './utils';

const routes = {
  '/': homeScreen,
  '/product/:id': mealScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  // '/signin': SigninScreen
};
const router = async () => {
  const request = parseRequestURL();
  const parseUrl = 
        (request.resource ? `/${request.resource}` : '/')
        + (request.id ? '/:id' : '')
        + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  await screen.after_render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
