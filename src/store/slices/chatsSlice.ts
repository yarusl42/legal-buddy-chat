import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat } from '@/types/types';

interface ChatsState {
  chats: Chat[];
  activeChat: string | null; 
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatsState = {
  chats: [],
  activeChat: null,
  isLoading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    clearAllChats: () => initialState,

    createChat: (state, action: PayloadAction<{ chatId: string; advisorId: string }>) => {
      const newChat: Chat = {
        id: action.payload.chatId,
        advisorId: action.payload.advisorId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active'
      };
      state.chats.push(newChat);
      state.activeChat = newChat.id;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    updateChatLastMessage: (state, action: PayloadAction<{ chatId: string; message: string }>) => {
      const chat = state.chats.find(c => c.id === action.payload.chatId);
      if (chat) {
        chat.lastMessage = action.payload.message;
        chat.updatedAt = new Date().toISOString();
      }
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter(chat => chat.id !== action.payload);
      if (state.activeChat === action.payload) {
        state.activeChat = state.chats[0]?.id || null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
});

export const {
  createChat,
  setActiveChat,
  updateChatLastMessage,
  deleteChat,
  setLoading,
  setError,
  setChats,
  clearAllChats
} = chatsSlice.actions;

export default chatsSlice.reducer;
