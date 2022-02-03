import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Product = ({ product }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: product.image }} />
        </View>
        {/* Product Details View */}
        <View style={{ flex: 3 }}>
          <View>
            <Text>{product.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{product.rating}</Text>
                <AntDesign name='star' size={15} color='black' />
              </View>
            </View>
          </View>
          {/* -- Price View */}
          <View style={{ marginTop: 4 }}>
            <Text style={{ fontSize: 16 }}>
              {`$${product.price}  `}
              <Text style={styles.actualPrice}>
                {(product.price * 1.1).toFixed(2)}
              </Text>
              <Text style={{ color: 'green' }}>{`  ${10}%`}</Text>
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
        <AntDesign name='tag' size={18} color='black' />

        <Text style={{ marginLeft: 10, fontSize: 12 }}>{product.fullName}</Text>
      </View>
      {/* Specifications Wrap */}
      <View style={styles.specContainer}>
        {product.specifications.map((spec, index) => (
          <Text key={index} style={styles.specifications}>
            {spec}
          </Text>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderBottomColor: '#dfe4ea',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  imageContainer: { flex: 1, paddingHorizontal: 5, marginRight: 15 },
  image: { width: 100, height: 100, resizeMode: 'contain', padding: 5 },
  ratingContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff200',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    marginLeft: 10,
  },
  rating: {
    color: '#111',
    marginRight: 8,
    fontSize: 16,
  },
  actualPrice: {
    color: '#57606f',
    textDecorationLine: 'line-through',
  },
  specContainer: {
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  specifications: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#FF6347',
    alignSelf: 'baseline',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default Product;
