import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { userLoginReducer, userRegisterReducer } from './reducers/usersReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  creatOrderReducer,
  getAllOrdersReducer,
  getUsrtOrdersReducer,
} from './reducers/orderReducers';
import { cartRedcuer } from './reducers/cartReducers';
import {
  getProductDetailReducer,
  getProductsReducer,
  productCreateReducer,
  productDeleteReducer,
  productUploadReducer,
} from './reducers/productReducers';

const reducers = combineReducers({
  //users
  login: userLoginReducer,
  register: userRegisterReducer,
  //cart
  cart: cartRedcuer,
  addOrder: creatOrderReducer,
  userOrder: getUsrtOrdersReducer,
  allOrders: getAllOrdersReducer,
  //products
  productList: getProductsReducer,
  productDetail: getProductDetailReducer,
  productUpload: productUploadReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
});

const loadCart = async () => {
  const value = await AsyncStorage.getItem('ehicm-cart');
  if (value !== null) {
    const data = JSON.parse(value);
    return await data;
  } else {
    return [];
  }
};

const loadUser = async () => {
  const value = await AsyncStorage.getItem('ehicm-user');
  if (value !== null) {
    const data = JSON.parse(value);
    return await data;
  } else {
    return null;
  }
};

const cartInfoFromStorage = loadCart().then(
  (res) => (initialState.cart.cartItems = res)
);

const userInfoFromStorage = loadUser().then(
  (res) => (initialState.login.userInfo = res)
);

const middleware = [thunk];

const initialState = {
  login: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartInfoFromStorage,
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
