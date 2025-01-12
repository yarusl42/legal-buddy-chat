import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Advisor } from '@/types/advisor';

interface AdvisorsState {
  availableAdvisors: Advisor[];
  selectedAdvisors: Advisor[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdvisorsState = {
  availableAdvisors: [],
  selectedAdvisors: [],
  isLoading: false,
  error: null,
};

const advisorsSlice = createSlice({
  name: 'advisors',
  initialState,
  reducers: {
    setAvailableAdvisors: (state, action: PayloadAction<Advisor[]>) => {
      state.availableAdvisors = action.payload;
    },
    addSelectedAdvisor: (state, action: PayloadAction<Advisor>) => {
      if (!state.selectedAdvisors.find(advisor => advisor.id === action.payload.id)) {
        state.selectedAdvisors.push(action.payload);
      }
    },
    removeSelectedAdvisor: (state, action: PayloadAction<string>) => {
      state.selectedAdvisors = state.selectedAdvisors.filter(
        advisor => advisor.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAvailableAdvisors,
  addSelectedAdvisor,
  removeSelectedAdvisor,
  setLoading,
  setError,
} = advisorsSlice.actions;

export default advisorsSlice.reducer;
