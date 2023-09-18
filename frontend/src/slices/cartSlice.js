import { createSlice } from "@reduxjs/toolkit";

import { updateCart } from "../utils/cartUtils.js";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
    };

// const addDecimals = (number) => {
//   return (Math.round(number * 100) / 100).toFixed(2);
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existingItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;

      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);

      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
