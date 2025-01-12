import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentCard {
  id: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isPreferred: boolean;
  brand: string;
}

interface BillingHistory {
  date: string;
  plan: string;
  amount: string;
  status: "Paid" | "Unpaid";
}

interface BillingState {
  paymentMethods: PaymentCard[];
  billingHistory: BillingHistory[];
  isAutoRenewalEnabled: boolean;
  nextBillingDate: string;
}

const initialState: BillingState = {
  paymentMethods: [],
  billingHistory: [
    { date: "November 2023", plan: "Professional Plan", amount: "$79.00", status: "Paid" },
    { date: "December 2023", plan: "Professional Plan", amount: "$79.00", status: "Unpaid" },
    { date: "October 2023", plan: "Professional Plan", amount: "$79.00", status: "Paid" },
  ],
  isAutoRenewalEnabled: true,
  nextBillingDate: "Dec 1, 2023",
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    addPaymentMethod: (state, action: PayloadAction<PaymentCard>) => {
      state.paymentMethods.push(action.payload);
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
  },
});

export const {
  addPaymentMethod,
  removePaymentMethod,
  setPreferredPaymentMethod,
  setAutoRenewal,
  addBillingHistory,
  updateBillingStatus,
} = billingSlice.actions;

export default billingSlice.reducer;
