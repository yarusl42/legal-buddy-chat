import { Advisor, ChatMessage } from "../types/advisor";
import { store } from '../store'; // Import your store
import { addMessage } from '../store/slices/messagesSlice'; 
import { addSelectedAdvisor } from "@/store/slices/advisorsSlice";
import { createChat as createChatSlice } from "@/store/slices/chatsSlice";
// Mock API service for chat-related operations
function generate_dummy_message_id () {
  return `message_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
function generate_dummy_chat_id () {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const chatService = {
  createChat: async (advisor: Advisor): Promise<{ chatId: string; initialMessage: ChatMessage }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate a unique chat ID
    const chatId = generate_dummy_chat_id();

    // Create the initial welcome message

    const initialMessage: ChatMessage = {
      id: generate_dummy_message_id(),
      content: `Hello! I'm your advisor. How can I help you today?`,
      sender: "advisor",
      timestamp: new Date(),
      chatId: chatId,
    };

     // Add the lawyer to selected advisors
     store.dispatch(addSelectedAdvisor(advisor));
      
     // Create a new chat with the received chatId
     store.dispatch(createChatSlice({
       chatId,
       advisorId: advisor.id 
     }));

     store.dispatch(addMessage({
       chatId,
       message: initialMessage
     }));
    return {
      chatId,
      initialMessage,
    };
  },
  sendMessage: async (message: { content: string; chatId: string }): Promise<ChatMessage> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate a response from the advisor
    const advisorResponse = `Ответ на ваше сообщение: ${message.content}`;

    const userMessage: ChatMessage = {
      id: generate_dummy_message_id(),
      content: message.content,
      sender: "user",
      timestamp: new Date(),
      chatId: message.chatId,
    };

    const response: ChatMessage = {
      id: generate_dummy_message_id(),
      content: advisorResponse,
      sender: "advisor",
      timestamp: new Date(),
      chatId: message.chatId,
    };

    store.dispatch(addMessage({ chatId: message.chatId, message: userMessage }));
    store.dispatch(addMessage({ chatId: message.chatId, message: response }));

    return response;
  }
};