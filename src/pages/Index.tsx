import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdvisorCard } from "@/components/AdvisorCard";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { setActiveChat } from "@/store/slices/chatsSlice";
import { chatService } from '@/services/chatService';
import { setSelectedAdvisor } from "@/store/slices/advisorsSlice";
import { Advisor } from "@/types/advisor";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const doneOnboarding = useAppSelector((state) => state.user.doneOnboarding);
  const selectedAdvisors = useAppSelector((state) => state.advisors.selectedAdvisors);
  const chats = useAppSelector((state) => state.chats.chats);
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const selectedAdvisor = useAppSelector((state) => state.advisors.selectedAdvisor);
  const messages = useAppSelector((state) => 
    activeChat ? state.messages.messages[activeChat] || [] : []
  );
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messagesOpacity, setMessagesOpacity] = useState(1);
  
  const handleChatSelect = (chatId: string) => {
    setMessagesOpacity(0);
    dispatch(setActiveChat(chatId));
  };
  
  function findSelectedAdvisor(chats: any[], selectedAdvisors: any[], activeChat: any): Advisor | null {
    if (chats.length === 0 || selectedAdvisors.length === 0 || !activeChat) return null;

    const result: Advisor | null = selectedAdvisors.find(
      (advisor) => chats.find((chat) => chat.id === activeChat)?.advisorId === advisor.id
    );

    if (result) {
      dispatch(setSelectedAdvisor(result));
      return result;
    }
    
    return null;
  }

  useEffect(() => {
    if (chats.length > 0 && !activeChat) {

    } else if (activeChat) {
      findSelectedAdvisor(chats, selectedAdvisors, activeChat);
    }
  }, [activeChat, chats, selectedAdvisors, dispatch]);

  useEffect(() => {
    const loadChats = async () => {
      if (doneOnboarding && chats.length === 0) {
        await chatService.loadChats();
      }
    };
    loadChats();
  }, [doneOnboarding, chats.length]);

  useEffect(() => {
    if (!doneOnboarding) {
      navigate("/select-lawyer");
    }
  }, [doneOnboarding, navigate]);

  useEffect(() => {
    if (messagesContainerRef.current && activeChat) {
      // Instant scroll to bottom
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'instant'
      });
      
      // Fade in messages after a brief delay
      setTimeout(() => {
        setMessagesOpacity(1);
      }, 50);
    }
  }, [activeChat]);

  useEffect(() => {
    if (messagesContainerRef.current && activeChat && messages.length > 0) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, activeChat]);

  const handleSendMessage = async (content: string) => {
    if (!activeChat || !selectedAdvisor) return;
    await chatService.sendMessage({
      content,
      chatId: activeChat
    });  
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-80 bg-white p-4 border-r border-gray-200 overflow-y-auto">
        {
          chats?.length ? (
            <>
              <h2 className="text-xl font-bold text-primary mb-4">Юридические консультанты</h2>
              <Button
                variant="default"
                className="mt-2 mb-4 bg-primary text-white hover:bg-primary/90"
                onClick={() => navigate("/select-lawyer")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Новый чат
              </Button>

              <h3 className="text-lg font-bold text-primary mt-4 mb-2">Ваши консультанты</h3>
            </>
          ) : (<></>)
        }
        
        {chats.map((chat) => {
          const advisor = selectedAdvisors.find((a) => a.id === chat.advisorId);
          if (!advisor) return null;
          
          return (
            <AdvisorCard
              key={chat.id}
              isSmall={true}
              advisor={advisor}
              isSelected={chat.id === activeChat}
              onClick={() => handleChatSelect(chat.id)}
            />
          );
        })}
      </div>

      <div className="flex-1 flex flex-col relative">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            {
              chats?.length ? (
                <>
                  <img
                    src={selectedAdvisor?.avatar}
                    alt={selectedAdvisor?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-primary">{selectedAdvisor?.name}</h3>
                    <p className="text-sm text-gray-600">{selectedAdvisor?.specialty}</p>
                  </div>
                </>
              ) : (
                <></>
              )
            }
          </div>
        </div>
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 flex justify-center pb-32" 
          ref={messagesContainerRef}
          style={{ 
            opacity: messagesOpacity,
            transition: 'opacity 0.2s ease-in-out' 
          }}
        >
          <div className="w-full max-w-[800px]">
            {
              chats?.length ? (
                messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))   
              ) : (
                <div className="flex justify-center items-center h-full">
                  <Spinner size={32} />
                </div>
              )
            }
          
          </div>
        </div>
        <div className="w-full max-w-[800px] bg-white absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
      </div>
    </div>
  );
};

export default Index;
