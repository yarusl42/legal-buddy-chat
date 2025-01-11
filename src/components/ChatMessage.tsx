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
          "max-w-[80%] rounded-lg p-4",
          isAdvisor
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};