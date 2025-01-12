import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '@/types/advisor';

interface MessagesState {
  messages: Record<string, ChatMessage[]>; // chatId -> messages
  isLoading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: {},
  isLoading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ chatId: string; message: ChatMessage }>) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push({
        ...message,
        chatId
      });
    },
    setMessages: (state, action: PayloadAction<{ chatId: string; messages: ChatMessage[] }>) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages.map(msg => ({
        ...msg,
        chatId
      }));
    },
    clearMessages: (state, action: PayloadAction<string>) => {
      delete state.messages[action.payload];
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
  addMessage,
  setMessages,
  clearMessages,
  setLoading,
  setError,
} = messagesSlice.actions;

export default messagesSlice.reducer;
