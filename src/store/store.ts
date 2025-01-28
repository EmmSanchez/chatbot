import { create } from "zustand";
import { Message } from "@/types/types";

interface ChatState {
  prompt: string;
  setPrompt: (newPrompt: string) => void;
  messages: Message[];
  addMessage: (newMessage: Message) => void;
}

export const useStore = create<ChatState>((set) => ({
  prompt: "",
  setPrompt: (newPrompt: string) => set({ prompt: newPrompt }),
  messages: [],
  addMessage: (newMessage: Message) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));
