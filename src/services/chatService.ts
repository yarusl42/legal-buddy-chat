import { Advisor, ChatMessage } from "@/types/advisor";
import { store } from '@/store'; // Import your store
import { addMessage, setMessages } from '@/store/slices/messagesSlice'; 
import { addSelectedAdvisor, setSelectedAdvisors } from "@/store/slices/advisorsSlice";
import { createChat as createChatSlice, setChats, setActiveChat } from "@/store/slices/chatsSlice";
import { Chat } from '@/types/types';
import { increaseUsedRequests } from "@/store/slices/usageSlice";

// Mock API service for chat-related operations
function generate_dummy_message_id () {
  return `message_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
function generate_dummy_chat_id () {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

const chat1 = generate_dummy_chat_id()
const chat2 = generate_dummy_chat_id()

const fetchChatResponseData = [
  {
    chat: {
      id: chat1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
    advisor: {
      id: '1',
      name: 'John Doe',
      avatar: "/placeholder.svg",
      specialty: 'Corporate Law',
      description: "Expert in business law with 15 years of experience handling mergers, acquisitions, and corporate governance.",
    },
    messages: [
      { id: generate_dummy_message_id(), chatId: chat1, sender: "advisor", content: 'How can I help you today?', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat1, sender: "user", content: 'I need advice on company registration.', timestamp: new Date().toISOString() }
    ]
  },
  {
    chat: {
      id: chat2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
    advisor: {
      id: '2',
      name: 'Jane Smith',
      avatar: "/placeholder.svg",
      specialty: 'Tax Law',
      description: "Expert in tax regulations and compliance, helping clients navigate complex tax issues."
    },
    messages: [
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'Welcome! What tax matters can I assist you with?', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'I have questions about international taxation.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'Sure! What specific areas are you concerned about?', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'I’m worried about my tax obligations for overseas income.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'That’s a common concern. Let’s go over your situation.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'I earn income from freelance work abroad.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'Have you reported this income on your tax return?', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'Not yet, I wasn’t sure how to do it.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'I can help you with that. You need to declare it.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'What forms do I need to fill out?', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'You’ll need to file a foreign income form.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'Is there a deadline for that?', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'Yes, it’s usually due by April 15th.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'What if I miss the deadline?', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'You may incur penalties, but we can discuss options.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'Thank you for the information!', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'You’re welcome! Do you have any other questions?', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'Not at the moment, but I’ll reach out if I do.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "advisor", content: 'Sounds good! I’m here to help.', timestamp: new Date().toISOString() },
      { id: generate_dummy_message_id(), chatId: chat2, sender: "user", content: 'Thanks again!', timestamp: new Date().toISOString() },
    ]
  }
];


const dummyChatId1 = generate_dummy_chat_id();
const dummyChatId2 = generate_dummy_chat_id();
const dummyMessageId = generate_dummy_message_id()

export const chatService = {
  createChat: async (advisor: Advisor): Promise<{ chatId: string; initialMessage: ChatMessage }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const initialMessage: ChatMessage = {
      id: dummyMessageId,
      content: `Hello! I'm your advisor. How can I help you today?`,
      sender: "advisor",
      timestamp: new Date().toISOString(),
      chatId: dummyChatId1,
    };

     // Add the lawyer to selected advisors
     store.dispatch(addSelectedAdvisor(advisor));
      
     // Create a new chat with the received chatId
     store.dispatch(createChatSlice({
      chatId: dummyChatId1,
       advisorId: advisor.id 
     }));

     store.dispatch(addMessage({
      chatId: dummyChatId1,
       message: initialMessage
     }));
    return {
      chatId: dummyChatId1,
      initialMessage,
    };
  },
  sendMessage: async (message: { content: string; chatId: string }): Promise<ChatMessage> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // const responseData = {
    //   status: "not enough credits",
    // }
    const responseData = {
      status: "ok",
    }
    if(responseData.status === "not enough credits") {
      throw new Error("not enough credits");
    } else if (responseData.status === "ok") {
      store.dispatch(increaseUsedRequests(1));
    } else {
      throw new Error("something went wrong");
    }
    // Simulate a response from the advisor
    const advisorResponse = `Ответ на ваше сообщение: ${message.content}`;

    const userMessage: ChatMessage = {
      id: generate_dummy_message_id(),
      content: message.content,
      sender: "user",
      timestamp: new Date().toISOString(),
      chatId: message.chatId,
    };

    const response: ChatMessage = {
      id: generate_dummy_message_id(),
      content: advisorResponse,
      sender: "advisor",
      timestamp: new Date().toISOString(),
      chatId: message.chatId,
    };

    store.dispatch(addMessage({ chatId: message.chatId, message: userMessage }));
    store.dispatch(addMessage({ chatId: message.chatId, message: response }));

    return response;
  },
  loadChats: async (): Promise<{ chats: Chat[], messages: ChatMessage[]; advisors: Advisor[] }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    
    let chats: Chat[] = [];
    let messages: ChatMessage[] = [];
    let advisors: Advisor[] = [];

    for (const response of fetchChatResponseData) {
      if (response.chat.status !== 'active') continue;
      response.messages.forEach((message) => {
        if (message.sender !== "advisor" && message.sender !== "user") {
          throw new Error(`Invalid message sender: ${message.sender}`);
        }  
      });

      const chat: Chat = {
        ...response.chat,
        advisorId: response.advisor.id,
        status: response.chat.status === 'active' || response.chat.status === 'closed' ? response.chat.status : 'active'
      };
      chats.push(chat);
      const advisor: Advisor = response.advisor;
      advisors.push(advisor);
      const messagesChunk: ChatMessage[] = response.messages.map((message) => ({
        ...message,
        sender: message.sender === "advisor" ? "advisor" : "user"
      }));
      messages.push(...messagesChunk);
    }

    store.dispatch(setChats(chats));
    store.dispatch(setMessages(messages));
    store.dispatch(setSelectedAdvisors(advisors));
    chats.length ? store.dispatch(setActiveChat(chats[0].id)) : () => {};

    return {
      chats,
      messages,
      advisors
    };
  }
};