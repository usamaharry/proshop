export const updateCart = (state) => {
  //items price
  state.itemsPrice = Number(
    state.cartItems
      .reduce((acc, item) => (acc += item.price * item.qty), 0)
      .toFixed(2)
  );

  //shipping price
  state.shippingPrice = state.itemsPrice >= 100 ? 0 : 10;

  //tax price
  state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));

  //total price

  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
  state.totalPrice = Number(state.totalPrice.toFixed(2));

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
