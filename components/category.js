import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Card, CardItem } from 'native-base';

const CategoryCard = ({ item }) => {
  return (
    <ScrollView
      style={{ paddingHorizontal: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <Card style={{ marginTop: 10 }}>
        <CardItem style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.image} source={{ uri: item.img }} />
            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
          </View>
        </CardItem>
      </Card>

      <View style={{ height: 20 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  phoneText: {
    fontSize: 16,
    marginTop: 4,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#FF6347',
  },
});

export default CategoryCard;
