import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '@/store';
import { clearAllUsageSlice } from './usageSlice';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  isLoggedIn: boolean;
  doneOnboarding: boolean;
}

const userInitialState: UserState = {
  id: null,
  name: null,
  email: null,
  phone: null,
  isLoggedIn: false,
  doneOnboarding: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    clearAllUser: () => {
      return userInitialState;
    },
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<string | null>) => {
      state.phone = action.payload;
    },
    setOnboardingDone: (state, action: PayloadAction<boolean>) => {
      state.doneOnboarding = action.payload;
    },
    logout: () => {
      localStorage.removeItem('token');
      //return initialState;
    },
  },
});

export const { setUser, setIsLoggedIn, setName, setPhone, setOnboardingDone, logout, clearAllUser } = userSlice.actions;
export { userInitialState }
export default userSlice.reducer;
