import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BillingHistory } from '@/types/types';

interface PaymentCard {
  id: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isPreferred: boolean;
  brand: string;
}

interface BillingState {
  paymentMethods: PaymentCard[];
  billingHistory: BillingHistory[];
  isAutoRenewalEnabled: boolean;
  nextBillingDate: string;
  billingPeriod: { start: string; end: string; year: number } | null;
  loading: boolean;
  error: string | null;
}

const initialState: BillingState = {
  paymentMethods: [],
  billingHistory: [],
  isAutoRenewalEnabled: false,
  nextBillingDate: "None",
  billingPeriod: null,
  loading: false,
  error: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    clearAllBillingState: () => initialState,
    addPaymentMethod: (state, action: PayloadAction<PaymentCard>) => {
      state.paymentMethods.push(action.payload);
    },
    setBillingPeriod: (state, action: PayloadAction<{ start: string; end: string; year: number }>) => {
      state.billingPeriod = action.payload;
    },
    removePaymentMethod: (state, action: PayloadAction<string>) => {
      const index = state.paymentMethods.findIndex(card => card.id === action.payload);
      if (index !== -1) {
        if (state.paymentMethods[index].isPreferred && state.paymentMethods.length > 1) {
          state.paymentMethods[0].isPreferred = true;
        }
        state.paymentMethods.splice(index, 1);
      }
    },
    setPreferredPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethods = state.paymentMethods.map(card => ({
        ...card,
        isPreferred: card.id === action.payload,
      }));
    },
    setAutoRenewal: (state, action: PayloadAction<boolean>) => {
      state.isAutoRenewalEnabled = action.payload;
    },
    addBillingHistory: (state, action: PayloadAction<BillingHistory>) => {
      state.billingHistory.unshift(action.payload);
    },
    updateBillingStatus: (state, action: PayloadAction<{ date: string; status: "Paid" | "Unpaid" }>) => {
      const entry = state.billingHistory.find(entry => entry.date === action.payload.date);
      if (entry) {
        entry.status = action.payload.status;
      }
    },
    setNextBillingDate: (state, action: PayloadAction<string>) => {
      state.nextBillingDate = action.payload;
    },
    setBillingHistory: (state, action: PayloadAction<BillingHistory[]>) => {
      state.billingHistory = action.payload;
    },
  },
});

export const {
  addPaymentMethod,
  removePaymentMethod,
  setPreferredPaymentMethod,
  setAutoRenewal,
  addBillingHistory,
  updateBillingStatus,
  setNextBillingDate,
  setBillingHistory,
  clearAllBillingState,
  setBillingPeriod
} = billingSlice.actions;

export default billingSlice.reducer;
