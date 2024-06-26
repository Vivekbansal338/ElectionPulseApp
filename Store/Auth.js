import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  userId: null,
  userinitaldata: null, // userinitaldata is the data that is fetched from the api when the user logs in
  token: null,
  verify: {
    id: null,
  },
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    LoginRed(state, action) {
      console.log("----", action.payload.token);
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      // state.userid = action.payload.userid;
      // state.userinitaldata = action.payload.userinitaldata;

      // Store data in AsyncStorage
      // console.log(
      //   "action.payload",
      //   action.payload.userid,
      //   action.payload.token,
      //   action.payload.userinitaldata
      // );
      // AsyncStorage.setItem("userid", JSON.stringify(action.payload.userid));
      // AsyncStorage.setItem(
      //   "userinitaldata",
      //   JSON.stringify(action.payload.userinitaldata)
      // );
      // AsyncStorage.setItem("token", action.payload.token);
    },

    VerifyRed(state, action) {
      state.verify.id = action.payload.id;
    },
    LogoutRed(state) {
      state.token = null;
      state.userId = null;
      state.userinitaldata = null;
      // AsyncStorage.removeItem("userId");
      // AsyncStorage.removeItem("userinitaldata");
      // AsyncStorage.removeItem("token");
    },
  },
});

export const { LoginRed, LogoutRed, VerifyRed } = AuthSlice.actions;
export default AuthSlice.reducer;
