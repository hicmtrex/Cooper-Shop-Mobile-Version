import axios from 'axios';
import baseUrl from '../../data/base-url';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().login.userInfo.token}`,
      },
    };

    await axios.post(`${baseUrl}/orders`, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS });
    dispatch({ type: CART_CLEAR_ITEMS });

    await AsyncStorage.removeItem('ehicm-cart');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get(`${baseUrl}/orders`);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getUserOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const { data } = await axios.get(`${baseUrl}/orders/user/${id}`);

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
};
