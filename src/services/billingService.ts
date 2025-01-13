import { store } from '@/store';
import { setAutoRenewal, setNextBillingDate, setBillingHistory, setBillingPeriod } from '@/store/slices/billingSlice';
import { BillingHistory } from '@/types/types';

const billingHistory: BillingHistory[] = [
  { date: 'November 2023', plan: 'Professional Plan', amount: '$79.00', status: 'Paid' },
  { date: 'December 2023', plan: 'Professional Plan', amount: '$79.00', status: 'Unpaid' },
  { date: 'October 2023', plan: 'Professional Plan', amount: '$79.00', status: 'Paid' },
]

const nextBillingDate = 'December 1, 2023';
const isAutoRenewalEnabled = true;

export const billingService = {
  fetchBillingPeriod: async () => {
    const response = await new Promise<{ start: string; end: string; year: number }>((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
  
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
  
        resolve({
          start: startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          end: endDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          year: year,
        });
      }, 1000);
    });

    store.dispatch(setBillingPeriod(response));
  },
  fetchBillingData: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Dispatch actions to set the fetched data in the store
    store.dispatch(setBillingHistory(billingHistory));
    store.dispatch(setAutoRenewal(isAutoRenewalEnabled));
    store.dispatch(setNextBillingDate(nextBillingDate));
  }
}
