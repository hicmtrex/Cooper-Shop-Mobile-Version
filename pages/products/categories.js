import { H1 } from 'native-base';
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import CategoryCard from '../../components/category';
import { category } from '../../data/information';

const Categories = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <H1 style={{ textAlign: 'center' }}>Category</H1>
      <FlatList
        data={category}
        keyExtractor={(c) => c._id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <CategoryCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
