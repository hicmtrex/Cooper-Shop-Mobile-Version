import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/actions/cartActions';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const removehandler = (item) => {
    if (item.qty === 1) {
      Alert.alert('Confirm', `You want to delete ${item.name}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => dispatch(removeFromCart(item)) },
      ]);
    } else {
      dispatch(removeFromCart(item));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paymentTitle}>Shipping Cart</Text>
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
                    <Text style={styles.productTitle}>{product.name}</Text>
                  </View>
                  <View style={styles.productRightView}>
                    <Text
                      style={styles.productPriceText}
                    >{`$${product.price}`}</Text>
                    <View style={styles.productItemCounterView}>
                      <TouchableOpacity onPress={() => removehandler(product)}>
                        <AntDesign
                          style={styles.toggleCounterButton}
                          name='minuscircle'
                          size={20}
                          color='#FF6347'
                        />
                      </TouchableOpacity>
                      <Text style={styles.counterValue}>{product.qty}</Text>
                      <TouchableOpacity
                        onPress={() => dispatch(addToCart(product))}
                      >
                        <AntDesign
                          style={styles.toggleCounterButton}
                          name='pluscircle'
                          size={20}
                          color='#FF6347'
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}

              <View style={styles.subtotalView}>
                <Text style={styles.subtotalText}>Subtotal Items</Text>
                <Text style={styles.subtotalPrice}>
                  ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </Text>
              </View>

              <View style={styles.totalView}>
                <Text style={styles.totalText}>Total </Text>

                <Text style={styles.totalPrice}>
                  $
                  {cartItems
                    .reduce(
                      (acc, item) => Number(acc + item.price * item.qty),
                      0
                    )
                    .toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate('FormAddress')}
              >
                <Text style={styles.checkoutButtonText}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCartView}>
              <Text style={styles.emptyCartViewText}>Your cart is empty.</Text>
            </View>
          )}

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
    fontSize: 15,
    fontWeight: '500',
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
    fontSize: 18,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '300',
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

export default CartScreen;
