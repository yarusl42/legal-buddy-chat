import { store } from '@/store';
import { setUsageData, setTotalRequests, setUsedRequests } from '@/store/slices/usageSlice';

const dummyUsageData = {
  usagePerMonth: [
    { date: 'Jan 1', requests: 550 },
    { date: 'Jan 2', requests: 0 },
    { date: 'Jan 3', requests: 0 },
    { date: 'Jan 4', requests: 0 },
    { date: 'Jan 5', requests: 0 },
    { date: 'Jan 6', requests: 0 },
    { date: 'Jan 7', requests: 10 },
    { date: 'Jan 8', requests: 170 },
  ],
  totalRequests: 1000,
  usedRequests: 170,
};

export const usageService = {

  fetchUsageData: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Dispatch actions to set the fetched data in the store
    store.dispatch(setUsageData(dummyUsageData.usagePerMonth));
    store.dispatch(setTotalRequests(dummyUsageData.totalRequests));
    store.dispatch(setUsedRequests(dummyUsageData.usedRequests));
  }

}