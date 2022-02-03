import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import { Container, H1 } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../../store/actions/orderActions';

let { width, height } = Dimensions.get('window');

const OrdersList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  if (loading)
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size='large' color='red' />
      </View>
    );

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <H1 style={{ textAlign: 'center', marginBottom: 20 }}>Orders List</H1>
      <View style={styles.container}>
        <Text style={styles.topItem}>Orders </Text>
        <Text style={styles.topItem}>Price</Text>
        <Text style={styles.topItem}>Country</Text>
        <Text style={styles.topItem}>User</Text>
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
                {item.totalPrice}
              </Text>
              <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
                {item.shippingAddress.country}
              </Text>
              <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
                {item.user && item.user.username}
              </Text>
            </View>
          </View>
        )}
      />

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
    marginHorizontal: 5,
    width: width / 6,
    fontSize: 15,
    fontWeight: 'bold',
  },
  item: {
    flexWrap: 'wrap',
    margin: 5,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OrdersList;
