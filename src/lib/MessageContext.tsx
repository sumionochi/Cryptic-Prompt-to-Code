import { createContext } from "react";

// MessageContext.tsx
interface Message {
  role: 'user' | 'ai'; // Adjust the role type as needed
  content: string;
}

interface MessageContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: (messages: Message[]) => {}, // Default implementation
});