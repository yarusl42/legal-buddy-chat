import { useState } from "react";
import { advisors } from "../data/advisors";
import { AdvisorCard } from "../components/AdvisorCard";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { ChatMessage as ChatMessageType } from "../types/advisor";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle  } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedAdvisor, setSelectedAdvisor] = useState(advisors[0]);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "1",
      content: `Hello! I'm ${advisors[0].name}, your ${advisors[0].specialty} advisor. How can I help you today?`,
      sender: "advisor",
      timestamp: new Date(),
      advisorId: advisors[0].id,
    },
  ]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      advisorId: selectedAdvisor.id,
    };

    const advisorMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      content: `As a ${selectedAdvisor.specialty} specialist, I would need more context to provide accurate advice. Could you please provide more details?`,
      sender: "advisor",
      timestamp: new Date(Date.now() + 1000),
      advisorId: selectedAdvisor.id,
    };

    setMessages((prev) => [...prev, userMessage, advisorMessage]);
  };

  const handleAdvisorChange = (advisor: typeof advisors[0]) => {
    setSelectedAdvisor(advisor);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: `Hello! I'm ${advisor.name}, your ${advisor.specialty} advisor. I've reviewed the conversation and I'm ready to help.`,
        sender: "advisor",
        timestamp: new Date(),
        advisorId: advisor.id,
      },
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white p-4 border-r border-gray-200 overflow-y-auto">
        <h2 className="text-xl font-bold text-primary mb-4">Legal Advisors</h2>
        <Button
          variant="default"
          className="mt-2 mb-4 bg-primary text-white hover:bg-primary/90"
          onClick={() => navigate("/select-lawyer")}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>

        {advisors.length > 0 && (
          <h3 className="text-lg font-bold text-primary mt-4 mb-2">Your advisors</h3>
        )}
        {advisors.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Need legal advice? Initiate a chat with an advisor</p>
          </div>
        ) : (
          advisors.map((advisor) => (
            <AdvisorCard
              key={advisor.id}
              advisor={advisor}
              isSelected={advisor.id === selectedAdvisor.id}
              onClick={() => handleAdvisorChange(advisor)}
            />
          ))
        )}
        
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <img
              src={selectedAdvisor.avatar}
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