import React, { useState, useCallback, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Header, Item, Input, Button } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import ProductItem from './product-Item';

let { width, height } = Dimensions.get('window');

const ProductsList = (props) => {
  //   const [productList, setstate] = useState();
  //   const [productFilter, setProductFilter] = useState();
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  useFocusEffect(useCallback(() => {}, []));

  const searchProduct = (text) => {
    if (text == '') {
      setProductsFiltred(products);
    }
    setProductsFiltred(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('OrdersList')}
        >
          <Text style={styles.buttonText}>
            <Icon name='shopping-bag' size={10} color='white' /> Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('CreateProduct')}
        >
          <Text style={styles.buttonText}>
            <Icon name='plus' size={10} color='white' />
            <Text style={styles.buttonText}> Product</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Orders')}
        >
          <Text style={styles.buttonText}>
            <Icon name='plus' size={10} color='white' />
            <Text style={styles.buttonText}> Categories</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Header
          searchBar
          rounded
          style={{ backgroundColor: '#FF6347' }}
          androidStatusBarColor='#FF6347'
        />
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size='large' color='red' />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={products}
          renderItem={({ item, index }) => (
            <ProductItem
              item={item}
              navigation={props.navigation}
              index={index}
            />
          )}
        />
      )}
      <View style={{ height: 20 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    marginTop: 20,
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 50,
    flexDirection: 'row',
    borderRadius: 3,
    padding: 5,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: '#000',
    width: 100,
  },
  buttonContainer: {
    margin: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 10,
    marginLeft: 5,
    color: 'white',
  },
});

export default ProductsList;
