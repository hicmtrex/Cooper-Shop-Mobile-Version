import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../data/base-url';
import ShopContext from './context-app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [shippingAddress, setShippingAddress] = useState();
  const [isOnline, setIsOnline] = useState(false);
  //products
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  //Products

  const getProducts = async () => {
    // try {
    //   setLoading(true);
    //   const { data } = await axios.get(`${baseUrl}/products`);
    //   setProducts(data);
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   setError(error.message);
    // }
  };

  const searchProduct = (text) => {
    if (text === '') {
      setProducts(products);
    }
    setProducts(
      products.filter((p) => p.name.toUpperCase().includes(text.toUpperCase()))
    );
  };

  //Users
  const userLogin = async (email, password) => {
    try {
      await axios.get('http://10.0.2.2:5000/login');
      // const { data } = await axios.post(`${baseUrl}/users/login`, {
      //   email,
      //   password,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // setUserInfo(data);
      // setIsOnline(true);
      // const jsonValue = JSON.stringify(data);
      // await AsyncStorage.setItem('ehicm-user', jsonValue);
    } catch (error) {
      setError(
        error.response.data ? error.response.data.message : error.message
      );
    }
  };

  const userLogout = async () => {
    await AsyncStorage.removeItem('ehicm-user');
    setIsOnline(false);
    setUserInfo({});
  };

  //Cart

  const addToCart = (product) => {
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...exist, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist.qty === 1) {
      setCartItems(cartItems.filter((i) => i._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...exist, qty: item.qty - 1 } : item
        )
      );
    }
  };

  const creatAddress = (address, city, postalCode, country) => {
    setShippingAddress({ address, city, postalCode, country });
  };

  useEffect(() => {
    const loadUsers = async () => {
      const value = await AsyncStorage.getItem('ehicm-user');
      const data = JSON.parse(value);
      if (value !== null) {
        setUserInfo(data);
        setIsOnline(true);
      } else {
        setUserInfo({});
        setIsOnline(false);
      }
    };
    loadUsers();
  }, []);

  const values = {
    //products
    searchProduct,
    setProducts,
    getProducts,
    products,
    error,
    setError,
    loading,
    userLogin,
    userLogout,
    userInfo,
    isOnline,
    addToCart,
    removeFromCart,
    cartItems,
    creatAddress,
    shippingAddress,
  };
  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};

export default ContextProvider;
