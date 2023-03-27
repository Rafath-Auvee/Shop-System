import { ADD_TO_CART, REMOVE_TO_CART } from "./../actionTypes/actionTypes";
const initialState = {
  cart: [],
};

const reducers = (state = initialState, action) => {
  // console.log("🚀 ~ file: reducers.js:7 ~ reducers ~ action:", action.payload);

  const selectedItem = state.cart.find(
    (product) => product._id === action.payload._id
  );
  console.log(
    "🚀 ~ file: reducers.js:12 ~ reducers ~ selectedItem:",
    selectedItem
  );

  switch (action.type) {
    case ADD_TO_CART:
      if (selectedItem) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectedItem._id
        );

        selectedItem.quantity = selectedItem.quantity + 1;
        console.log(
          "🚀 ~ file: reducers.js:24 ~ reducers ~ ...state.cart:",
          ...state.cart
        );

        return {
          ...state,
          cart: [...newCart, selectedItem],
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case REMOVE_TO_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default reducers;
