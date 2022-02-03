import { Picker } from 'native-base';
import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import ShopContext from '../../context/context-app';
import countries from '../../data/countries.json';
import Icon from 'react-native-vector-icons/FontAwesome';

const FormAddress = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostaCode] = useState('');
  const [country, setCountry] = useState('');
  const { creatAddress, shippingAddress } = useContext(ShopContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (shippingAddress) {
      navigation.navigate('PlaceOrder');
    }
  }, [shippingAddress]);

  const creatAddressHandler = () => {
    if (
      address.trim() === '' ||
      city.trim() === '' ||
      postalCode.trim() === '' ||
      country.trim() === ''
    ) {
      setError('invalid input');
      return;
    }

    creatAddress(address, city, postalCode, country);

    navigation.navigate('PlaceOrder');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paymentTitle}>Shipping Address</Text>

      <View style={styles.cartContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartTitleView}>
            <Text style={styles.cartTitle}>Current address</Text>
          </View>
          <View>
            {error && <Text style={styles.error}>{error}</Text>}
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                placeholder='address'
                style={styles.input}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>City</Text>

              <TextInput
                placeholder='city'
                style={styles.input}
                onChangeText={(text) => setCity(text)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Postal Code</Text>

              <TextInput
                placeholder='postal code'
                style={styles.input}
                onChangeText={(text) => setPostaCode(text)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Country</Text>
              <Picker
                note='dropdown'
                iosIcon={<Icon name='arrow-down' color='#007aff' />}
                style={styles.input}
                selectedValue={country}
                placeholder='Select your country'
                onValueChange={(e) => setCountry(e)}
              >
                {countries.map((c) => (
                  <Picker.Item key={c.code} label={c.name} value={c.name} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={creatAddressHandler}
            >
              <Text style={styles.loginButtonText}>Proceed to Checkout</Text>
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
    alignItems: 'flex-start',
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
  cartTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 10,
  },
  error: {
    borderRadius: 10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 16,
  },
});

export default FormAddress;
