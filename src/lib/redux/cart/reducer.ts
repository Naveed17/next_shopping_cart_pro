import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  SetAddToCart,
  SetRemoveFromCart,
  SetUpdateQuantity,
  SetClearCart,
} from "./actions";
import { CartItem, Product } from "@src/@types/common";
interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const CartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SetAddToCart, (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: `${action.payload.id}-${Date.now()}`,
          productId: action.payload.id,
          product: action.payload,
          quantity: 1,
          price: action.payload.price,
        });
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    })
    .addCase(SetRemoveFromCart, (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    })
    .addCase(
      SetUpdateQuantity,
      (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
          state.total = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        }
      }
    )
    .addCase(SetClearCart, (state) => {
      state.items = [];
      state.total = 0;
    });
});
