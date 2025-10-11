import { createAction } from "@reduxjs/toolkit";
import { Product } from "@src/@types/common";

export const SetAddToCart = createAction<Product>("SET_ADD_TO_CART");
export const SetRemoveFromCart = createAction<string>("SET_REMOVE_FROM_CART");
export const SetUpdateQuantity = createAction<{ id: string; quantity: number }>(
  "SET_UPDATE_QUANTITY"
);
export const SetClearCart = createAction("SET_CLEAR_CART");
