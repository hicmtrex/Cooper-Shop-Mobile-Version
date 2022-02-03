import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import ShopContext from '../../context/context-app';
import { Radio } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../store/actions/orderActions';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const PlaceOrder = ({ navigation }) => {
  const [shippingMethod, setShippingMethod] = useState('Normal');
  const { shippingAddress } = useContext(ShopContext);
  //redux
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { success, error } = useSelector((state) => state.addOrder);
  const { userInfo } = useSelector((state) => state.login);

  //price
  const itemPrices = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const taxPrice = itemPrices * 0.1;

  const shopPrice = shippingMethod === 'Normal' ? 0 : 60;

  const totalPrice = Number(itemPrices + shopPrice + taxPrice).toFixed(2);

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate('Login');
    }
  }, [userInfo]);

  const placeOrderHandler = () => {
    Alert.alert('Confirm', `Your Order Total Price $${totalPrice}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Order'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(
            createOrder({
              user: userInfo._id,
              cartItems,
              shippingAddress,
              totalPrice,
            })
          );
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: `Your order is confirmed!`,
            text2: `thank you ${userInfo.username} `,
          });
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paymentTitle}>Place Order</Text>
      <View style={styles.cartContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartTitleView}>
            <Ionicons name='cart' size={30} />
            <Text style={styles.cartTitle}>My Cart</Text>
          </View>

          {cartItems.length > 0 ? (
            <View>
              {cartItems.map((product) => (
                <View key={product.id} style={styles.productView}>
                  <Image
                    resizeMode='contain'
                    style={styles.productImage}
                    source={{
                      uri: product.image,
                    }}
                  />
                  <View style={styles.productMiddleView}>
                    <Text style={styles.productTitle}>{product.brand}</Text>
                    <Text style={styles.productCompanyTitle}>
                      {product.name}
                    </Text>
                  </View>
                  <View style={styles.productRightView}>
                    <Text style={styles.productPriceText}>{`$${
                      product.price * product.qty
                    }`}</Text>
                    <View style={styles.productItemCounterView}>
                      <Text style={styles.counterValue}>{product.qty}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <View style={{ marginTop: 10 }}>
                <View style={styles.cartTitleView}>
                  <Ionicons name='home' size={25} />
                  <Text style={styles.cartTitle}>Shipping Address</Text>
                </View>
                <View style={styles.subtotalView}>
                  <Text style={styles.subtotalText}>Address</Text>
                  <Text style={styles.subtotalPrice}>
                    {shippingAddress.address}
                  </Text>
                </View>
                <View style={styles.subtotalView}>
                  <Text style={styles.subtotalText}>City</Text>
                  <Text style={styles.subtotalPrice}>
                    {shippingAddress.city}
                  </Text>
                </View>
                <View style={styles.subtotalView}>
                  <Text style={styles.subtotalText}>Postal Code</Text>
                  <Text style={styles.subtotalPrice}>
                    {shippingAddress.postalCode}
                  </Text>
                </View>
                <View style={styles.subtotalView}>
                  <Text style={styles.subtotalText}>County</Text>
                  <Text style={styles.subtotalPrice}>
                    {shippingAddress.country}
                  </Text>
                </View>
              </View>
              <View style={styles.shippingView}>
                <Text style={styles.shippingText}>Shipping :</Text>
                <View style={styles.shippingItemsView}>
                  <TouchableOpacity
                    style={styles.shippingItem}
                    onPress={() => {
                      setShippingMethod('Normal');
                    }}
                  >
                    <Text style={styles.shippingItemText}>Normal (Free)</Text>
                    <Radio selected={shippingMethod === 'Normal'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.shippingItem}
                    onPress={() => {
                      setShippingMethod('Express');
                    }}
                  >
                    <Text style={styles.shippingItemText}>Express ($60)</Text>
                    <Radio selected={shippingMethod === 'Express'} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.subtotalView}>
                <Text style={styles.subtotalText}>Item Price</Text>
                <Text style={styles.subtotalPrice}>
                  ${itemPrices.toFixed(2)}
                </Text>
              </View>
              <View style={styles.subtotalView}>
                <Text style={styles.subtotalText}>Tax</Text>
                <Text style={styles.subtotalPrice}>${taxPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.couponInputView}>
                <TextInput
                  placeholder='Coupon Code'
                  style={styles.couponInput}
                />
                <TouchableOpacity style={styles.couponButton}>
                  <Text style={styles.couponButtonText}>Apply Coupon</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>Total :</Text>

                <Text style={styles.totalPrice}>${totalPrice}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={placeOrderHandler}
              >
                <Text style={styles.checkoutButtonText}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCartView}>
              <Text style={styles.emptyCartViewText}>Your cart is empty.</Text>
            </View>
          )}

          <View style={{ height: 100 }}>
            {error && (
              <View style={{ backgroundColor: 'red', color: 'white' }}>
                <Text>{error}</Text>
              </View>
            )}
          </View>
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
  productView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 8,
    // borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    // shadowRadius: 2,
    elevation: 2,
    marginTop: 14,
  },
  productImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  productMiddleView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  productCompanyTitle: {
    fontSize: 16,
    fontWeight: '300',
  },
  productRightView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productItemCounterView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: '500',
  },
  productPriceText: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  toggleCounterButton: {
    paddingHorizontal: 10,
  },
  couponInputView: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  couponInput: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  couponButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  couponButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  subtotalView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  subtotalPrice: {
    fontSize: 18,
    fontWeight: '300',
  },
  shippingView: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  shippingItemsView: {
    marginTop: 10,
  },
  shippingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  shippingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shippingItemText: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  totalView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 14,
    marginTop: 30,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  emptyCartView: {
    flex: 1,
    marginTop: 140,
  },
  emptyCartViewText: {
    fontSize: 20,
    fontWeight: '300',
    alignSelf: 'center',
  },
});

export default PlaceOrder;
