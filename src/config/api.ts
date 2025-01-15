const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Chat endpoints
  CHAT_CREATE: `${API_BASE_URL}/chats/create`,
  CHAT_SEND_MESSAGE: `${API_BASE_URL}/chats/message`,
  CHAT_RATE_MESSAGE: `${API_BASE_URL}/chats/message/rate`,
  CHAT_REGENERATE_MESSAGE: `${API_BASE_URL}/chats/message/regenerate`,
  CHAT_LOAD: (userId: string) => `${API_BASE_URL}/chats/load/${userId}`,

  // User endpoints
  USER_LOGIN: `${API_BASE_URL}/users/login`,
  USER_SIGNUP: `${API_BASE_URL}/users/signup`,
  USER_ME: `${API_BASE_URL}/users/me`,
  USER_UPDATE: `${API_BASE_URL}/users/update`,
  USER_DELETE: `${API_BASE_URL}/users/delete`,
  USER_RESET_PASSWORD: `${API_BASE_URL}/users/reset-password`,

  // Billing endpoints
  BILLING_FETCH: `${API_BASE_URL}/billing`,
  BILLING_UPDATE: `${API_BASE_URL}/billing/update`,

  // Payment endpoints
  PAYMENT_METHODS: `${API_BASE_URL}/payments/methods`,
  PAYMENT_ADD: `${API_BASE_URL}/payments/add`,

  // Usage endpoints
  USAGE_DATA: `${API_BASE_URL}/usage/data`,
};
