import CartScreen from './screens/CartScreen';
import Error404Screen from './screens/Error404Screen';
import mealScreen from './screens/MealScreen';
import homeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen'
import SigninScreen from './screens/SigninScreen';
import Header from './components/Header'
import { parseRequestURL, showLoading, hideLoading} from './utils';

const routes = {
  '/': homeScreen,
  '/product/:id': mealScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen
};
const router = async () => {
  showLoading();
  const request = parseRequestURL();
  const parseUrl = 
        (request.resource ? `/${request.resource}` : '/')
        + (request.id ? '/:id' : '')
        + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
