import { ChatMessage as ChatMessageType } from "../types/advisor";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAdvisor = message.sender === "advisor";

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-message-fade-in",
        isAdvisor ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[90%] sm:max-w-[80%] rounded-lg p-3 sm:p-4",
          isAdvisor
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <div className={`message ${message.sender}`}>
          <p className="text-sm sm:text-base">{message.content}</p>
          <span className="text-[10px] sm:text-xs opacity-70 mt-1 block">
            {new Intl.DateTimeFormat('be-BY').format(new Date(message.timestamp))}
          </span>
        </div>
      </div>
    </div>
  );
};