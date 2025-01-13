import { store } from '@/store';
import { setCards } from '@/store/slices/paymentMethodsSlice';
import { PaymentCard } from '@/types/types';

const dummyPaymentMethods: PaymentCard[] = [
  {
    id: "1",
    number: "4242 4242 4242 4244",
    last4: "4244",
    expiryMonth: "12",
    expiryYear: "25",
    isPreferred: true,
    brand: "visa",
    cvv: "123"
  }
];

export const paymentMethodsService = {
  fetchPaymentMethods: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Dispatch action to set the fetched data in the store
    store.dispatch(setCards(dummyPaymentMethods));
  }
};
