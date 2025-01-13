import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsageData {
  date: string;
  requests: number;
}

interface UsageState {
  usagePerMonthLast12Month: UsageData[];
  totalRequests: number;
  usedRequests: number;
}

const initialState: UsageState = {
  usagePerMonthLast12Month: [],
  totalRequests: 5,
  usedRequests: 0,
};

const usageSlice = createSlice({
  name: 'usage',
  initialState,
  reducers: {
    clearAllUsageSlice: () => initialState,
    setUsageData: (state, action: PayloadAction<UsageData[]>) => {
      state.usagePerMonthLast12Month = action.payload;
    },
    setTotalRequests: (state, action: PayloadAction<number>) => {
      state.totalRequests = action.payload;
    },
    increaseUsedRequests: (state, action: PayloadAction<number>) => {
      if (state.usedRequests >= state.totalRequests) {
        const increment = action.payload || 1
        state.usedRequests += increment;
      }
    },
    setUsedRequests: (state, action: PayloadAction<number>) => {
      state.usedRequests = action.payload;
    },
  },
});

export const { clearAllUsageSlice, setUsageData, setTotalRequests, setUsedRequests, increaseUsedRequests } = usageSlice.actions;
export default usageSlice.reducer;
