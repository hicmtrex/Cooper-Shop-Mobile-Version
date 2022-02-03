import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_MINUS_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartRedcuer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const product = action.payload;
      const exist = state.cartItems.find((item) => item._id === product._id);

      if (exist) {
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === product._id ? { ...exist, qty: item.qty + 1 } : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...product, qty: 1 }],
        };
      }
    case CART_MINUS_ITEM:
      const productItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item._id === productItem._id
      );

      if (existItem.qty === 1) {
        return {
          cartItems: state.cartItems.filter(
            (item) => item._id !== productItem._id
          ),
        };
      } else {
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === productItem._id
              ? { ...existItem, qty: item.qty - 1 }
              : item
          ),
        };
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    default:
      return state;
  }
};
