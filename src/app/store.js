import { configureStore } from "@reduxjs/toolkit";
import colorsReducer from "./slices/colorsSlice";

const store = configureStore({
  reducer: {
    colors: colorsReducer,
  },
});

export default store;
