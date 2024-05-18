import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";
import LocationReducer from "./Locations";
import VoteCartReducer from "./VoteCart";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Location: LocationReducer,
    VoteCart: VoteCartReducer,
  },
});
