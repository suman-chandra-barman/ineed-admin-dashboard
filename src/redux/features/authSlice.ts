import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  saveTokenToStorage,
  saveUserToStorage,
  removeTokenFromStorage,
  removeUserFromStorage,
} from "@/lib/auth-storage";

interface User {
  id: string;
  full_name: string;
  email_address: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        tokens: { access: string; refresh: string };
      }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.tokens.access;
      state.refreshToken = action.payload.tokens.refresh;

      // Persist to localStorage and cookies
      saveTokenToStorage(
        action.payload.tokens.access,
        action.payload.tokens.refresh,
      );
      saveUserToStorage(action.payload.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;

      // Clear from localStorage and cookies
      removeTokenFromStorage();
      removeUserFromStorage();
    },
    hydrate: (
      state,
      action: PayloadAction<{
        user: User | null;
        token: string | null;
        refreshToken: string | null;
      }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setCredentials, logout, hydrate } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
