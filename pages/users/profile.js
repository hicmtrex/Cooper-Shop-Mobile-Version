import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { Container, H1, Header, List, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder } from '../../store/actions/orderActions';
import { userLogout } from '../../store/actions/usersAction';

let { width, height } = Dimensions.get('window');

const Profile = ({ navigation }) => {
  //redux
  const { cartItems } = useSelector((state) => state.cart);
  const { orders, loading, error } = useSelector((state) => state.userOrder);
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate('Login');
    }
    dispatch(getUserOrder(userInfo?._id));
  }, [userInfo]);

  navigation.setOptions({
    title: 'My Account',
    headerTitleStyle: { fontSize: 22, color: 'white' },
    headerStyle: { backgroundColor: '#000', height: 120 },

    headerRight: () => (
      <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Icon name='shopping-cart' size={30} color={'white'} />
        <View style={[styles.iconCountView, { right: -6 }]}>
          <Text style={styles.iconCountText}>{cartItems.length}</Text>
        </View>
      </TouchableOpacity>
    ),
  });

  if (loading)
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size='large' color='red' />
      </View>
    );

  return (
    <ScrollView>
      <Header
        style={{ height: 50, backgroundColor: '#000' }}
        androidStatusBarColor='#000'
      >
        <View style={{ marginRight: 200 }}>
          <Text style={{ color: 'orange', fontSize: 15 }}>
            Welcome {userInfo?.username}
          </Text>
          <Text style={{ color: 'white' }}>{userInfo?.email}</Text>
        </View>
      </Header>

      <H1 style={{ textAlign: 'center', marginVertical: 10 }}>My Orders</H1>
      {error && (
        <View>
          <Text style={{ backgroundColor: 'red' }}>{error}</Text>
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.topItem}>Orders </Text>
        <Text style={styles.topItem}>Price</Text>
        <Text style={styles.topItem}>Country</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View style={styles.centeredView}>
            <View
              style={[
                styles.container,
                {
                  backgroundColor: index % 2 == 0 ? 'white' : 'gainsboro',
                },
              ]}
            >
              <Text style={styles.item}>{index + 1}</Text>
              <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
                {' '}
                $5333.99
              </Text>
              <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
                {' '}
                {item.shippingAddress.country}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={{ marginTop: 10 }}>
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home');
            dispatch(userLogout());
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Button>
      </View>
      <View style={{ height: 20 }}></View>
    </ScrollView>
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
    backgroundColor: 'orange',
  },
  iconCountText: { color: '#fff', fontWeight: 'bold' },
  //orders
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topItem: {
    flexWrap: 'wrap',
    marginHorizontal: 3,
    width: width / 6,
    fontSize: 15,
    fontWeight: 'bold',
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 3,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347',
    width: 400,
  },
  buttonText: {
    fontSize: 15,
    marginLeft: 5,
    color: 'white',
  },
});
export default Profile;
