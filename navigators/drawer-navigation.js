import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { category } from '../data/information';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerType='front'
      initialRouteName='Category'
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 10 },
      }}
    >
      {category.map((c) => (
        <Drawer.Screen key={c.name} name={c.name} />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
