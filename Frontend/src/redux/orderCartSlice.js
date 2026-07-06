import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const orderCartSlice = createSlice({
  name: 'orderCart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      
      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.images[0]
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item._id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  },
});

export const { addItem, removeItem, clearCart } = orderCartSlice.actions;
export default orderCartSlice.reducer;
