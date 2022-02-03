import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../store/actions/productActions';

let { width } = Dimensions.get('window');

const ProductItem = ({ item, navigation, index }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Alert.alert('Confirm', `You want to delete ${item.name}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(deleteProduct(id)) },
    ]);
  };

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}
              underlayColor='#e8e8e8'
              onPress={() => setModalVisible(false)}
            >
              <Icon
                onPress={() => setModalVisible(false)}
                name='close'
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('EditProduct', { item })}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDel}
              onPress={() => handleDelete(item._id)}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        // onPress={() => {
        //  navigation.navigate('ProductDetail', { item });
        // }}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.container,
          {
            backgroundColor: index % 2 == 0 ? 'white' : 'gainsboro',
          },
        ]}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <Text style={styles.item}>{item.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
          {item.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>
          {item.category} Laptop
        </Text>
        <Text style={styles.item}>$ {item.price}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 10,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    backgroundColor: '#62b1f6',
    width: 120,
  },
  buttonDel: {
    flexDirection: 'row',
    borderRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 120,
  },
});
export default ProductItem;
