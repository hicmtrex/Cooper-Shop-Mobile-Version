import axios from 'axios';
import baseUrl from '../../data/base-url';
import { CART_ADD_ITEM, CART_MINUS_ITEM } from '../constants/cartConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToCart = (product) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${baseUrl}/products/${product._id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        _id: data._id,
        product: data._id,
        name: data.name,
        price: data.price,
        qty: product.qty,
        image: data.image,
      },
    });
    const jsonValue = JSON.stringify(getState().cart.cartItems);
    await AsyncStorage.setItem('ehicm-cart', jsonValue);
  } catch (error) {
    console.log(
      error.response.data ? error.response.data.message : error.message
    );
  }
};

export const removeFromCart = (product) => async (dispatch, getState) => {
  dispatch({ type: CART_MINUS_ITEM, payload: product });
  const jsonValue = JSON.stringify(getState().cart.cartItems);
  await AsyncStorage.setItem('ehicm-cart', jsonValue);
};
