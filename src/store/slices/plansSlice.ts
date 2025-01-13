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

const initialPlansState: PlansState = {
  currentPlan: "Free",
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
  initialState: initialPlansState,
  reducers: {
    clearAllPlans: () => initialPlansState,
    setAvailablePlans: (state, action: PayloadAction<Record<string, Plan>>) => {
      state.availablePlans = action.payload;
    },
    setCurrentPlan: (state, action: PayloadAction<string>) => {
      state.currentPlan = action.payload;
    },
    updatePlan: (state, action: PayloadAction<{ name: string; plan: Plan }>) => {
      state.availablePlans[action.payload.name] = action.payload.plan;
    },
  },
});

 
export const { setCurrentPlan, updatePlan, setAvailablePlans, clearAllPlans } = plansSlice.actions;

export default plansSlice.reducer;
