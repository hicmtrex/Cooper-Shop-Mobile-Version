import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashbored from '../pages/admin/dashbored';
import UsersList from '../pages/admin/users/users-list';
import ProductsList from '../pages/admin/products/product-list';
import EditProduct from '../pages/admin/products/edit-product';
import OrdersList from '../pages/admin/orders/order-list';
import CreateProduct from '../pages/admin/products/create-product';

const Stack = createStackNavigator();

const AdminNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='ProductsList'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='OrdersList' component={OrdersList} />
      <Stack.Screen name='UsersList' component={UsersList} />
      <Stack.Screen name='ProductsList' component={ProductsList} />
      <Stack.Screen name='EditProduct' component={EditProduct} />
      <Stack.Screen name='CreateProduct' component={CreateProduct} />
    </Stack.Navigator>
  );
};

export default AdminNavigation;
