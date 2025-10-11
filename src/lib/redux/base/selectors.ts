import { RootState } from "../store";
export const direction = (state: RootState) => state.root.direction;
export const locale = (state: RootState) => state.root.locale;
export const currency = (state: RootState) => state.root.currency;
export const country = (state: RootState) => state.root.country;
export const mode = (state: RootState) => state.root.mode;
export const layoutType = (state: RootState) => state.root.layoutType;
