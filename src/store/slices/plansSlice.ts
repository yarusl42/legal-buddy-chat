import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlanPrice {
  amount: string;
  currency: string;
}

interface Plan {
  name: string;
  price: PlanPrice;
  features: string[];
  isPopular?: boolean;
}

interface PlansState {
  currentPlan: string;
  availablePlans: Record<string, Plan>;
}

const initialState: PlansState = {
  currentPlan: "Professional",
  availablePlans: {
    Free: {
      name: "Free",
      price: { amount: "Free", currency: "" },
      features: ["5 calls/month", "Basic legal templates"]
    },
    Basic: {
      name: "Basic",
      price: { amount: "29", currency: "$" },
      features: ["50 calls/month", "Basic legal templates", "Email support"],
      isPopular: true
    },
    Professional: {
      name: "Professional",
      price: { amount: "79", currency: "$" },
      features: ["150 calls/month", "All legal templates", "Priority support", "Document review"]
    }
  }
};

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    setCurrentPlan: (state, action: PayloadAction<string>) => {
      state.currentPlan = action.payload;
    },
    updatePlan: (state, action: PayloadAction<{ name: string; plan: Plan }>) => {
      state.availablePlans[action.payload.name] = action.payload.plan;
    },
  },
});

export const { setCurrentPlan, updatePlan } = plansSlice.actions;
export default plansSlice.reducer;
