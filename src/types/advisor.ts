export interface Advisor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "advisor";
  timestamp: Date;
  chatId: string;
}