import axios from 'axios';
import baseUrl from '../../data/base-url';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(`${baseUrl}/users/login`, {
      email,
      password,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('ehicm-user', jsonValue);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
};
export const userRegister = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    await axios.post(`${baseUrl}/users`, {
      username,
      email,
      password,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({ type: USER_REGISTER_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: CART_CLEAR_ITEMS });
  await AsyncStorage.removeItem('ehicm-user');
  await AsyncStorage.removeItem('ehicm-cart');
};
