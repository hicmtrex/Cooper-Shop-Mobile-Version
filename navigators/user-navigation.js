import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import ProductDetail from '../pages/products/product-detail';
import ShopContext from '../context/context-app';
import Profile from '../pages/users/profile';
import LoginScreen from '../pages/users/login-screen';
import { useSelector } from 'react-redux';
import RegisterScreen from '../pages/users/register-screen';
const Stack = createStackNavigator();

const UserNavigation = () => {
  const { userInfo } = useSelector((state) => state.login);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {userInfo ? (
        <Stack.Screen
          options={{ headerShown: true }}
          name='Profile'
          component={Profile}
        />
      ) : (
        <Stack.Screen name='Login' component={LoginScreen} />
      )}
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
