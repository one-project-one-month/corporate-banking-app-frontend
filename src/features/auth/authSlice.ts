import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type AuthState = {
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  userId: Cookies.get("user_id") ?? null,
  accessToken: Cookies.get("access_token") ?? null,
  refreshToken: Cookies.get("refresh_token") ?? null,
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
    logout: (state) => {
      state.userId = null;
      state.accessToken = null;
      Cookies.remove("user_id");
      Cookies.remove("access_token");
    },
  },
});

export const { setAccessToken, setRefreshToken, setUserId, logout } =
  authSlice.actions;
export default authSlice.reducer;
