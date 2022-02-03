import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Product from '../components/product';
//import products from '../data/information';
import SafeArea from '../utils/safearea';
import { Feather as Icon } from '@expo/vector-icons';
import { Header, Item, Input } from 'native-base';
import Banner from '../components/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../store/actions/productActions';
import { PRODUCT_LIST_SEARCH } from '../store/constants/productConstants';

const Home = ({ navigation }) => {
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const { success } = useSelector((state) => state.productDelete);
  const { success: successUpload } = useSelector(
    (state) => state.productUpload
  );
  const { success: successCreate } = useSelector(
    (state) => state.productCreate
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, success, successCreate, successUpload]);

  navigation.setOptions({
    title: 'Products',
    headerTitleStyle: { fontSize: 22 },
    headerStyle: { backgroundColor: '#FF6347' },
    headerLeft: () => (
      <TouchableOpacity style={{ marginHorizontal: 10 }}>
        <Icon
          name='bar-chart-2'
          size={28}
          style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }] }}
        />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity style={{ marginHorizontal: 10 }}>
        <Icon name='shopping-cart' size={24} />
        <View style={[styles.iconCountView, { right: -6 }]}>
          <Text style={styles.iconCountText}>4</Text>
        </View>
      </TouchableOpacity>
    ),
  });

  return (
    <SafeArea>
      <Header
        searchBar
        rounded
        style={{ backgroundColor: '#FF6347' }}
        androidStatusBarColor='#FF6347'
      >
        <Item style={{ padding: 5 }}>
          <Icon name='search' size={24} />
          <Input
            placeholder='Search'
            onChangeText={(text) => {
              if (text === '') {
                dispatch(getAllProducts());
              }
              dispatch({
                type: PRODUCT_LIST_SEARCH,
                payload: text,
              });
            }}
          />
        </Item>
      </Header>
      <ScrollView>
        <View>
          <Banner />
          {error && (
            <View style={{ backgroundColor: 'red', color: 'white' }}>
              <Text>{error}</Text>
            </View>
          )}
        </View>
        {loading ? (
          <ActivityIndicator size='large' color='blue' />
        ) : (
          <View style={{ marginBottom: 10 }}>
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', { product: item })
                  }
                >
                  <Product product={item} />
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <View style={{ height: 20 }}></View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  arrangeProductsBar: {
    flexDirection: 'row',
    paddingVertical: 14,
    backgroundColor: '#fafafa',
    borderBottomColor: '#dfe4ea',
    borderBottomWidth: 1,
  },
  arrangeProductsBarItemOpacity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrangeProductsBarItemLabel: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  iconCountView: {
    position: 'absolute',
    zIndex: 2,
    right: -4,
    top: -4,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  iconCountText: { color: '#fff', fontWeight: 'bold' },
});

export default Home;
