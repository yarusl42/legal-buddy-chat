import Chat from '../models/Chat';
import Message from '../models/Message';

// Dummy data generation helpers
const generateDummyId = () => Math.random().toString(36).substr(2, 9);

const dummyAdvisors = [
  {
    id: '1',
    name: 'John Doe',
    avatar: "/placeholder.svg",
    specialty: 'Corporate Law',
    description: "Expert in business law with 15 years of experience."
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: "/placeholder.svg",
    specialty: 'Tax Law',
    description: "Expert in tax regulations and compliance."
  }
];

export const chatService = {
  createChat: async (userId: string, advisorId: string) => {
    try {
      const chat = new Chat({
        userId,
        advisorId,
        status: 'active'
      });
      
      const savedChat = await chat.save();
      
      // Create initial message
      const message = new Message({
        chatId: savedChat._id,
        content: "Hello! I'm your advisor. How can I help you today?",
        sender: 'advisor'
      });
      
      await message.save();
      
      return {
        chat: savedChat,
        message,
        advisor: dummyAdvisors.find(a => a.id === advisorId)
      };
    } catch (error) {
      throw new Error('Error creating chat');
    }
  },

  sendMessage: async (chatId: string, content: string, sender: 'user' | 'advisor') => {
    try {
      const message = new Message({
        chatId,
        content,
        sender
      });
      
      await message.save();

      // If user message, create dummy advisor response
      if (sender === 'user') {
        const response = new Message({
          chatId,
          content: `Ответ на ваше сообщение: ${content}`,
          sender: 'advisor'
        });
        
        await response.save();
        return response;
      }
      
      return message;
    } catch (error) {
      throw new Error('Error sending message');
    }
  },

  updateMessageRating: async (messageId: string, rating: boolean) => {
    try {
      return await Message.findByIdAndUpdate(
        messageId,
        { liked: rating },
        { new: true }
      );
    } catch (error) {
      throw new Error('Error updating message rating');
    }
  },

  regenerateMessage: async (messageId: string) => {
    try {
      const message = await Message.findById(messageId);
      if (!message) throw new Error('Message not found');

      const newMessage = new Message({
        chatId: message.chatId,
        content: `Regenerated: ${message.content}`,
        sender: 'advisor'
      });

      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw new Error('Error regenerating message');
    }
  },

  loadChats: async (userId: string) => {
    try {
      const chats = await Chat.find({ userId, status: 'active' });
      const messages = await Message.find({
        chatId: { $in: chats.map(chat => chat._id) }
      });

      return {
        chats,
        messages,
        advisors: dummyAdvisors
      };
    } catch (error) {
      throw new Error('Error loading chats');
    }
  }
};
