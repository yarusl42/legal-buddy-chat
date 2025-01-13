import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentCard } from '@/types/types';

const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState: [],
  reducers: {
    clearAllPaymentMethods: (state) => {
      Object.assign(state, []);
    },
    addCard: (state, action: PayloadAction<PaymentCard>) => {
      state.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      return state.filter(card => card.id !== action.payload);
    },
    setAsPreferred: (state, action: PayloadAction<string>) => {
      state.forEach(card => {
        card.isPreferred = card.id === action.payload;
      });
    },
    setCards: (state, action: PayloadAction<PaymentCard[]>) => {
      return action.payload;
    },
  },
});

export const { addCard, removeCard, setAsPreferred, setCards, clearAllPaymentMethods } = paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;
