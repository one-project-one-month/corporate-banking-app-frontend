import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type AuthState = {
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
  email: string | null;
};

const initialState: AuthState = {
  userId: Cookies.get("user_id") ?? null,
  accessToken: Cookies.get("access_token") ?? null,
  refreshToken: Cookies.get("refresh_token") ?? null,
  username: Cookies.get("username") ?? null,
  email: Cookies.get("email") ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      Cookies.set("access_token", action.payload, { expires: 7 });
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      Cookies.set("refresh_token", action.payload);
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      Cookies.set("user_id", action.payload);
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      Cookies.set("username", action.payload);
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      Cookies.set("email", action.payload);
    },
    logout: (state) => {
      state.userId = null;
      state.accessToken = null;
      Cookies.remove("user_id");
      Cookies.remove("access_token");
      Cookies.remove("username");
      Cookies.remove("email");
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setUserId,
  setUserName,
  setEmail,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
