import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import billingReducer from './slices/billingSlice';
import plansReducer from './slices/plansSlice';
import advisorsReducer from './slices/advisorsSlice';
import chatsReducer from './slices/chatsSlice';
import messagesReducer from './slices/messagesSlice';
import usageReducer from './slices/usageSlice';
import paymentMethodsReducer from './slices/paymentMethodsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    billing: billingReducer,
    plans: plansReducer,
    advisors: advisorsReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    usage: usageReducer,
    paymentMethods: paymentMethodsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;