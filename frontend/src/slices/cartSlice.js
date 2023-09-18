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
        const existingQty = existingItem.qty;
        const newQty = item.qty;

        state.cartItems = state.cartItems.map((item) =>
          item._id === existingItem._id
            ? { ...existingItem, qty: existingQty + newQty }
            : item
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
