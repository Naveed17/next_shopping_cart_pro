import { createAction } from "@reduxjs/toolkit";
import { LayoutType, Theme } from "@src/@types/theme";

type ModeType = Theme;
export const setMode = createAction<ModeType["mode"]>("SET_MODE");
export const setDirection = createAction<"ltr" | "rtl">("SET_DIRECTION");
export const setLocale = createAction<string>("SET_LOCALE");
export const setCurrency = createAction<string>("SET_CURRENCY");
export const setCountry = createAction<string>("SET_COUNTRY");
export const setLayoutType = createAction<LayoutType>("SET_LAYOUT_TYPE");
