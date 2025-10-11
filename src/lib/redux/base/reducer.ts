import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  setDirection,
  setLocale,
  setCurrency,
  setCountry,
  setMode,
  setLayoutType,
} from "./actions";
import { LayoutType } from "@src/@types/theme";

// 2. Destination interface is used here to type the destination property in the State interface
interface State {
  direction: "ltr" | "rtl";
  locale: string;
  currency: string;
  country: string;
  mode: "light" | "dark";
  layoutType: LayoutType;
}

const initialState: State = {
  direction: "ltr",
  locale: "en",
  currency: "usd",
  country: "",
  mode: "light",
  layoutType: "default",
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMode, (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
    })
    .addCase(setDirection, (state, action: PayloadAction<"rtl" | "ltr">) => {
      state.direction = action.payload;
    })
    .addCase(setLocale, (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    })
    .addCase(setCountry, (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    })
    .addCase(setCurrency, (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    })
    .addCase(setLayoutType, (state, action: PayloadAction<LayoutType>) => {
      state.layoutType = action.payload;
    });
});
