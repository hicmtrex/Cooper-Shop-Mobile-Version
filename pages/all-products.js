import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';

function Product({ product }) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginTop: 10,
        borderBottomColor: '#dfe4ea',
        borderBottomWidth: 1,
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        {/* Product Image View */}
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Image
            style={{ width: 100, height: 100, resizeMode: 'center' }}
            source={{ uri: product.img }}
          />
        </View>
        {/* Product Details View */}
        <View style={{ flex: 3 }}>
          {/* -- Ratings View */}
          <View>
            <Text>{product.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff200',
                  alignItems: 'center',
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: '#111',
                    marginRight: 8,
                    fontFamily: 'SSBold',
                    fontSize: 16,
                  }}
                >
                  {product.rating}
                </Text>
                {/* <RNEIcon
                  name='star'
                  type='font-awesome'
                  size={12}
                  color={'#111'}
                /> */}
              </View>
              <Text style={{ marginLeft: 6 }}>({product.ratingCount})</Text>
            </View>
          </View>
          {/* -- Price View */}
          <View style={{ marginTop: 4 }}>
            <Text style={{ fontFamily: 'SSBold', fontSize: 16 }}>
              {`₹${product.price}  `}
              <Text
                style={{
                  color: '#57606f',
                  textDecorationLine: 'line-through',
                }}
              >
                {product.actualPrice !== '' ? `₹${product.actualPrice}` : null}
              </Text>
              <Text style={{ color: 'green' }}>{`  ${product.discount}`}</Text>
            </Text>
          </View>
        </View>
      </View>
      {/* Offer View */}
      <View
        style={{
          paddingHorizontal: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* <RNEIcon name='tag' type='font-awesome' size={16} /> */}
        <Text style={{ marginLeft: 10, fontSize: 16, fontFamily: 'SSRegular' }}>
          {product.offer}
        </Text>
      </View>
      {/* Specifications Wrap */}
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {product.specifications.map((spec) => (
          <Text
            style={{
              marginTop: 4,
              marginBottom: 4,
              marginLeft: 4,
              marginRight: 4,
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              alignSelf: 'baseline',
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 4,
            }}
          >
            {spec}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function ProductListScreen1({ navigation }) {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  navigation.setOptions({
    title: 'Laptops',
    headerTitleStyle: { fontSize: 22, fontFamily: 'SSBold' },
    headerStyle: { backgroundColor: '#f6e58d' },
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
    <>
      {/* Arrange Products Bar */}
      <View style={styles.arrangeProductsBar}>
        <TouchableOpacity
          style={[
            styles.arrangeProductsBarItemOpacity,
            { borderRightColor: '#dfe4ea', borderRightWidth: 1 },
          ]}
        >
          {/* <RNEIcon name='sort-amount-down' type='font-awesome-5' size={20} /> */}
          <Text style={styles.arrangeProductsBarItemLabel}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrangeProductsBarItemOpacity}>
          <View>
            {/* <RNEIcon name='filter' type='font-awesome-5' size={20} /> */}
            <View style={styles.iconCountView}>
              <Text style={styles.iconCountText}>2</Text>
            </View>
          </View>
          <Text style={styles.arrangeProductsBarItemLabel}>Filter</Text>
        </TouchableOpacity>
      </View>
      {/* Products List */}
      <ScrollView>
        {Array(5)
          .fill(1)
          .map((el) =>
            products.map((product) => (
              <TouchableOpacity>
                <Product product={product} />
              </TouchableOpacity>
            ))
          )}
      </ScrollView>
      <View style={{ height: 20 }}></View>
    </>
  );
}

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
    fontFamily: 'SSRegular',
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
  iconCountText: { color: '#fff', fontWeight: 'bold', fontFamily: 'SSBold' },
});
