import { configureStore } from "@reduxjs/toolkit";

import destiNationReducer from "./slices/destintions";
import vehiclesReducer from "./slices/vehicles";

const store = configureStore({
  reducer: {
    destintions: destiNationReducer,
    vehicles: vehiclesReducer
  }
});

export default store;
