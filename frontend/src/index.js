import CartScreen from './screens/CartScreen';
import Error404Screen from './screens/Error404Screen';
import mealScreen from './screens/MealScreen';
import homeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen'
import SigninScreen from './screens/SigninScreen';
import Header from './components/Header'
import { parseRequestURL, showLoading, hideLoading} from './utils';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProductListScreen from './screens/ProductListScreen';
import OrdersListScreen from './screens/OrdersListScreen';

// routes url and screens as responders
const routes = {
  '/': homeScreen,
  '/product/:id': mealScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/dashboard': DashboardScreen,
  '/productlist': ProductListScreen,
  '/orderlist': OrdersListScreen,
};
// router function
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
  if(screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
