import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigation from './home-navigation';
import Categories from '../pages/products/categories';
import UserNavigation from './user-navigation';
import CartNavigation from './cart-navigation';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import AdminNavigation from './admin-navigation';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.login);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: '#FF6347',
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='home' color={color} size={30} />
          ),
        }}
        name='Home'
        component={HomeNavigation}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='bars' color={color} size={30} />
          ),
        }}
        name='Category'
        component={Categories}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name='shopping-cart' size={30} color={color} />
              {cartItems.length >= 1 && (
                <View style={[styles.iconCountView, { right: -6 }]}>
                  <Text style={styles.iconCountText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
          ),
        }}
        name='Checkout'
        component={CartNavigation}
      />

      {userInfo && userInfo.isAdmin ? (
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name='cog' size={30} color={color} />
            ),
          }}
          name='Admin'
          component={AdminNavigation}
        />
      ) : null}
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='user' color={color} size={30} />
          ),
        }}
        name='User'
        component={UserNavigation}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  iconCountView: {
    position: 'absolute',
    zIndex: 2,
    right: -4,
    top: -4,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#FF6347',
  },
  iconCountText: { color: '#fff', fontWeight: 'bold' },
});

export default BottomNavigation;
