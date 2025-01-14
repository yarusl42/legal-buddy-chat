import { Button } from "@/components/ui/button";
import { Send, Square, Loader2 } from "lucide-react";
import { useState, FormEvent, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
  onStopResponse?: () => void;
}

export const ChatInput = ({ 
  onSendMessage, 
  isProcessing = false, 
  onStopResponse 
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const hasContent = message.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hasContent || isProcessing) return;
    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (hasContent && !isProcessing) {
        onSendMessage(message.trim());
        setMessage("");
      }
    }
  };

  const renderButtonContent = () => {
    if (isProcessing) {
      return onStopResponse ? (
        <Square className="h-4 w-4" />
      ) : (
        <Loader2 className="h-4 w-4 animate-spin" />
      );
    }
    return <Send className="h-4 w-4" />;
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 p-2 sm:p-0 bg-white">
      <div className="relative flex-1">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing && !onStopResponse}
          placeholder="Введите ваше сообщение..."
          className="flex-1 text-sm sm:text-base pr-12 h-24 p-4 resize-none rounded-xl"
        />
        <Button 
          type="submit"
          size="icon"
          onClick={isProcessing && onStopResponse ? onStopResponse : undefined}
          className={cn(
            "absolute right-2 bottom-2 h-9 w-9",
            (!hasContent && !isProcessing) || (isProcessing && !onStopResponse)
              ? "bg-gray-100 hover:bg-gray-200 text-gray-400"
              : ""
          )}
          disabled={(!hasContent && !isProcessing) || (isProcessing && !onStopResponse)}
        >
          {renderButtonContent()}
        </Button>
      </div>
    </form>
  );
};