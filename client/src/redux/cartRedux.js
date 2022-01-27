import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.products.length;
      state.total = action.payload.products
        .map((product) => product.price * product.quantity)
        .reduce((prev, next) => prev + next);
    },
    addProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) =>
          product.productId + product.color + product.size ===
          action.payload.productId + action.payload.color + action.payload.size
      );
      if (index === -1) {
        state.quantity += 1;
        state.products = action.payload.products;
      } else {
        state.products[index].quantity += action.payload.quantity;
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    // addProduct: (state, action) => {
    //   const index = state.products.findIndex(
    //     (product) =>
    //       product._id + product.color + product.size ===
    //       action.payload._id + action.payload.color + action.payload.size
    //   );
    //   if (index === -1) {
    //     state.quantity += 1;
    //     state.products.push(action.payload);
    //   } else {
    //     state.products[index].quantity += action.payload.quantity;
    //   }
    //   state.total += action.payload.price * action.payload.quantity;
    // },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) =>
          product.productId + product.color + product.size ===
          action.payload.productId + action.payload.color + action.payload.size
      );
      state.products.splice(index, 1);
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    increaseQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) =>
          product.productId + product.color + product.size ===
          action.payload.productId + action.payload.color + action.payload.size
      );
      state.products[index].quantity += 1;
      state.total += action.payload.price;
    },
    decreaseQuantity: (state, action) => {
      const index = state.products.findIndex(
        (product) =>
          product.productId + product.color + product.size ===
          action.payload.productId + action.payload.color + action.payload.size
      );
      state.products[index].quantity -= 1;
      state.total -= action.payload.price;
    },
    cleanCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  getProducts,
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  cleanCart,
} = cartSlice.actions;
export default cartSlice.reducer;
