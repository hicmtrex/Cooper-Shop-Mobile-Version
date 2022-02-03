import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProduct } from '../../../store/actions/productActions';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

const EditProduct = ({ route, navigation }) => {
  //redux
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.productUpload);
  //states
  const { item: product } = route.params;
  const [name, setName] = useState(product.name);
  const [fullName, setFullName] = useState(product.fullName);
  const [price, setPrice] = useState(10);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState('');
  const [specification1, setSpecification1] = useState(
    product.specifications[0]
  );
  const [specification2, setSpecification2] = useState(
    product.specifications[1]
  );
  const [mainImage, setMainImage] = useState();

  const uploadHandler = () => {
    const newImageUri = 'file:///' + image.split('file:/').join('');
    dispatch(
      uploadProduct({
        _id: product._id,
        name,
        fullName,
        price,
        brand,
        category,
        description,
        image,
        specifications: [specification1, specification2],
      })
    );
    Toast.show({
      topOffset: 60,
      type: 'success',
      text1: `${product?.name}`,
      text2: 'has been updated',
    });
    navigation.navigate('ProductsList');
  };

  useEffect(() => {
    const pickerImage = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await imagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    pickerImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartTitleView}>
            <Text style={styles.cartTitle}>Edit Product</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: mainImage }} />
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              <Icon style={{ color: 'white' }} name='camera' />
            </TouchableOpacity>
          </View>
          <View>
            {error && <Text style={styles.error}>{error}</Text>}
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                placeholder='Name'
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Full Name</Text>

              <TextInput
                placeholder='Full Name'
                style={styles.input}
                onChangeText={(text) => setFullName(text)}
                value={fullName}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Price</Text>

              <TextInput
                keyboardType={'numeric'}
                placeholder='price'
                style={styles.input}
                onChangeText={(text) => setPrice(text)}
                value={price}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Brand</Text>

              <TextInput
                placeholder='Brand'
                style={styles.input}
                onChangeText={(text) => setBrand(text)}
                value={brand}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>category</Text>

              <TextInput
                placeholder='category'
                style={styles.input}
                onChangeText={(text) => setCategory(text)}
                value={category}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>specification 1</Text>

              <TextInput
                placeholder='specification 1'
                style={styles.input}
                onChangeText={(text) => setSpecification1(text)}
                value={specification1}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>specification 2</Text>

              <TextInput
                placeholder='specification 2'
                style={styles.input}
                onChangeText={(text) => setSpecification2(text)}
                value={specification2}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Description</Text>

              <TextInput
                placeholder='description'
                style={styles.inputDescription}
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
            </View>

            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={uploadHandler}
            >
              <Text style={styles.loginButtonText}>Update</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347',
    paddingTop: 40,
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  paymentTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },

  placeOrderButton: {
    backgroundColor: '#FF6347',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    fontSize: 15,
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  inputDescription: {
    fontSize: 15,
    width: '100%',
    height: 60,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  cartTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 100,
    marginBottom: 10,
  },
  error: {
    borderRadius: 10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 16,
  },
  //images
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
    marginLeft: 80,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default EditProduct;
