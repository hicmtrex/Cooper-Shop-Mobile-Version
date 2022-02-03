import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';
//import products from '../../data/laptops';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';

const Rating = ({ rating, maxRating }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array(rating)
        .fill(1)
        .map((el) => (
          <FAIcon name='star' size={20} color='#2e2e2e' />
        ))}
      {Array(maxRating - rating)
        .fill(1)
        .map((el) => (
          <FAIcon name='star-o' size={20} color='#2e2e2e' />
        ))}
    </View>
  );
};

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const [isFavourite, setFavourite] = useState(false);
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  const dispatch = useDispatch();

  const addHandler = (item) => {
    dispatch(addToCart(item));
    Toast.show({
      topOffset: 60,
      type: 'success',
      text1: `${item?.name} added to Cart`,
      text2: 'Go to your cart to complete order',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={{ height: 400 }}
            resizeMode='contain'
            source={{
              uri: product.image,
            }}
          />
        </View>
        <View style={styles.detailsView}>
          <View style={styles.productTitleView}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <TouchableOpacity onPress={() => setFavourite(!isFavourite)}>
              <FAIcon
                color={isFavourite ? 'red' : 'black'}
                name={isFavourite ? 'heart' : 'heart-o'}
                size={22}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productPriceView}>
            <Text style={styles.discountedPriceText}>$29.99</Text>
            <Text style={styles.actualPriceText}>$40.00</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Rating rating={4} maxRating={5} />
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
              <TouchableOpacity
                style={styles.buyNowButton}
                onPress={() => {
                  dispatch(addToCart(product));
                  navigation.navigate('Checkout');
                }}
              >
                <Text style={styles.buttonText}>Buy Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addHandler(product)}
              >
                <Text style={[styles.buttonText, { color: '#111' }]}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
              <View style={styles.productDescriptionHeader}>
                <Text style={{ fontSize: 18 }}>Product Description</Text>
              </View>
              <View style={{ padding: 10 }}>
                <Text>{product.description}</Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                }}
              >
                More Products
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>
                  {products.map((item) => (
                    <View
                      key={item._id}
                      style={{ width: 180, marginHorizontal: 10 }}
                    >
                      <View style={styles.moreProductImageView}>
                        <Image
                          resizeMode='contain'
                          style={{ flex: 1 }}
                          source={{
                            uri: item.image,
                          }}
                        />
                      </View>
                      <View style={{ marginTop: 8 }}>
                        <Text style={styles.moreProductName}>{item.name}</Text>
                        <View style={styles.moreProductPriceView}>
                          <Text style={styles.moreProductPrice}>
                            ${item.price}
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Icon
                              style={styles.moreProductIcon}
                              name='heart'
                              size={18}
                            />
                            <Icon
                              style={styles.moreProductIcon}
                              name='shopping-bag'
                              size={18}
                            />
                            <Icon
                              style={styles.moreProductIcon}
                              name='share'
                              size={18}
                            />
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.moreProductBuyButton}
                        onPress={() => {
                          dispatch(addToCart(item));
                          navigation.navigate('Checkout');
                        }}
                      >
                        <Text style={[styles.buttonText, { color: '#fff' }]}>
                          Buy Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#dfe4fe',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
  },
  detailsView: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  productTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 24,
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPriceText: { fontSize: 20 },
  actualPriceText: {
    color: '#222',
    marginLeft: 10,
    textDecorationLine: 'line-through',
    fontSize: 18,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#111',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  tag: {
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabel: {
    color: '#333',
  },
  tagSelected: {
    backgroundColor: '#333',
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabelSelected: {
    color: '#FFF',
  },
  productDescriptionHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4fe',
  },
  moreProductImageView: {
    flex: 1,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  moreProductName: {
    fontSize: 16,
  },
  moreProductPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moreProductPrice: {
    fontSize: 16,
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductBuyButton: {
    backgroundColor: '#FF6347',
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreProductBuyButtonText: {
    color: '#fff',

    fontSize: 18,
  },
});

export default ProductDetail;
