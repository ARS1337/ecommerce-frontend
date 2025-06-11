// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // [{id, name, price, quantity}]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    decreaseFromCart: (state, action) => {
      const itemId = action.payload.id;
      const existingItem = state.items.find((i) => i.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== itemId);
        }
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, decreaseFromCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
