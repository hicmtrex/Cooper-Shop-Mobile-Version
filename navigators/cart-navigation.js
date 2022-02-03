import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FormAddress from '../pages/cart/form-address';
import CartScreen from '../pages/cart/cart-screen';
import PlaceOrder from '../pages/cart/place-order';

const Stack = createStackNavigator();

const CartNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Cart'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='FormAddress' component={FormAddress} />
      <Stack.Screen name='PlaceOrder' component={PlaceOrder} />
    </Stack.Navigator>
  );
};

export default CartNavigation;
