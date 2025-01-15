import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, ChatMessage as ChatMessageType } from '@/types/advisor';
import { toast } from "react-toastify";

interface MessagesState {
  messages: Record<string, ChatMessage[]>; // chatId -> messages
  isLoading: boolean;
  error: string | null;
}

const initialMessagesState: MessagesState = {
  messages: {},
  isLoading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialMessagesState,
  reducers: {
    clearAllMessages: () => initialMessagesState,
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
    setChatMessages: (state, action: PayloadAction<{ chatId: string; messages: ChatMessage[] | ChatMessageType[] }>) => {
      state.messages[action.payload.chatId] = action.payload.messages;
    },
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = {};

      for (const message of action.payload) {
        if (!state.messages[message.chatId]) {
          state.messages[message.chatId] = [];
        }
        state.messages[message.chatId].push(message);
      }
    },
    regenerateMessage: (state, action: PayloadAction<{ message: ChatMessage }>) => {
        // remove all the messages that came after the regenerated message
        const editedIndex = state.messages[action.payload.message.chatId].findIndex(msg => msg.id === action.payload.message.id);
        const chatMessages = state.messages[action.payload.message.chatId]
        // remove all messages in chat messages that come after editedIndex
        state.messages[action.payload.message.chatId] = chatMessages.slice(0, editedIndex);

        //add new regenerated message
        state.messages[action.payload.message.chatId].push(action.payload.message);
    },
    rateMessage: (state, action: PayloadAction<{ message: ChatMessage; rating: boolean }>) => {
      const { message, rating } = action.payload;
      const chatId = message.chatId;
      const editedIndex = state.messages[chatId].findIndex(msg => msg.id === message.id);
  
      state.messages[chatId][editedIndex].liked = rating;
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
  clearAllMessages,
  setChatMessages,
  rateMessage,
  regenerateMessage
} = messagesSlice.actions;

export default messagesSlice.reducer;
