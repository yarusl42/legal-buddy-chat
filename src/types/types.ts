export interface Chat {
  id: string;
  advisorId: string;
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'closed';
}

export interface ChatMessage {
  id: string;
  chatId: string;
  sender: 'advisor' | 'user';
  content: string;
  timestamp: string;
}

export interface Advisor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  description: string;
}

export interface BillingHistory {
  date: string;
  plan: string;
  amount: string;
  status: 'Paid' | 'Unpaid';
}

export interface PaymentCard {
  id: string;
  number: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isPreferred: boolean;
  brand: string;
  cvv: string;
}