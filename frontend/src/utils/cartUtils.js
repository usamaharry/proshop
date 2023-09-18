export const updateCart = (state) => {
  //items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );

  //shipping price
  state.shippingPrice = state.itemsPrice >= 100 ? 0 : 10;

  //tax price
  state.taxPrice = 0.15 * state.itemsPrice;

  //total price

  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
