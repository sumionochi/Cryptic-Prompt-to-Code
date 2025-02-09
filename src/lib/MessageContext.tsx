import { createContext } from "react";

interface Message {
  role: string;
  content: string;
}

interface MessageContextType {
  messages: Message[];
  setMessages: (message: Message) => void;
}

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: () => {},
});