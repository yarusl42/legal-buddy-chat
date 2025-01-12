import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 p-2 sm:p-0">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 text-sm sm:text-base"
      />
      <Button type="submit" size="icon" className="shrink-0">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};