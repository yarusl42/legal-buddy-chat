import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdvisorCard } from "../components/AdvisorCard";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { Button } from "@/components/ui/button";
import { setActiveChat } from "@/store/slices/chatsSlice";
import { chatService } from '@/services/chatService';

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const selectedAdvisors = useAppSelector((state) => state.advisors.selectedAdvisors);
  const chats = useAppSelector((state) => state.chats.chats);
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const messages = useAppSelector((state) => 
    activeChat ? state.messages.messages[activeChat] || [] : []
  );
  console.log("messages", messages);
  console.log("activeChat", activeChat);
  console.log("chats", chats);
  console.log("selectedAdvisors", selectedAdvisors);
  const selectedAdvisor = selectedAdvisors.find(
    (advisor) => chats.find((chat) => chat.id === activeChat)?.advisorId === advisor.id
  );

  useEffect(() => {
    if (selectedAdvisors.length === 0) {
      navigate("/select-lawyer");
    }
  }, [selectedAdvisors, navigate]);

  const handleSendMessage = async (content: string) => {
    if (!activeChat || !selectedAdvisor) return;

    await chatService.sendMessage({
      content,
      chatId: activeChat
    });  
  };

  const handleChatSelect = (chatId: string) => {
    dispatch(setActiveChat(chatId));
  };

  if (!selectedAdvisor) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white p-4 border-r border-gray-200 overflow-y-auto">
        <h2 className="text-xl font-bold text-primary mb-4">Юридические консультанты</h2>
        <Button
          variant="default"
          className="mt-2 mb-4 bg-primary text-white hover:bg-primary/90"
          onClick={() => navigate("/select-lawyer")}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Новый чат
        </Button>

        {selectedAdvisors.length > 0 && (
          <h3 className="text-lg font-bold text-primary mt-4 mb-2">Ваши консультанты</h3>
        )}
        
        {chats.map((chat) => {
          const advisor = selectedAdvisors.find((a) => a.id === chat.advisorId);
          if (!advisor) return null;
          
          return (
            <AdvisorCard
              key={chat.id}
              isSmall={true}
              advisor={{ ...advisor, avatar: "/placeholder.svg" }}
              isSelected={chat.id === activeChat}
              onClick={() => handleChatSelect(chat.id)}
            />
          );
        })}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <img
              src="/placeholder.svg"
              alt={selectedAdvisor.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-primary">{selectedAdvisor.name}</h3>
              <p className="text-sm text-gray-600">{selectedAdvisor.specialty}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Index;