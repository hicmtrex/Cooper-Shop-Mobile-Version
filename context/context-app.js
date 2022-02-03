import { createContext } from 'react';

const ShopContext = createContext({
  // products
  searchProduct: (text) => {},
  getProducts: () => {},
  products: [],
  error: null,
  setError: null,
  loading: false,
  userInfo: {},
  isOnline: false,
  cartItems: [],
  shippingAddress: {},
  userLogin: (identifier, password) => {},
  creatAddress: (address, city, postaCode, country) => {},
  userLogout: () => {},
  addToCart: (product) => {},
  removeFromCart: (product) => {},
});

export default ShopContext;
