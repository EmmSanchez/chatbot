import { create } from "zustand";
import { Message } from "@/types/types";
// import { useChat } from "ai/react";

// interface ChatState {
//   prompt: string;
//   setPrompt: (newPrompt: string) => void;
//   messages: Message[];
//   addMessage: (newMessage: Message) => void;
// }

// export const useStore = create<ChatState>((set) => ({
//   prompt: "",
//   setPrompt: (newPrompt: string) => set({ prompt: newPrompt }),
//   messages: [],
//   addMessage: (newMessage: Message) =>
//     set((state) => ({ messages: [...state.messages, newMessage] })),
// }));

// User Info
interface UserState {
  userInfo: {
    id: string;
    username: string;
  };
  setUserInfo: (id: string, username: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: {
    id: "",
    username: "",
  },
  setUserInfo: (id: string, username: string) =>
    set({ userInfo: { id, username } }),
  clearUser: () => set({ userInfo: { id: "", username: "" } }),
}));

// Saving the chat id when a chat is saved or fetched from the DB
interface ChatState {
  chatId: string | null;
  setChatId: (id: string) => void;
  clearChatId: () => void;
}

export const useChatState = create<ChatState>((set) => ({
  chatId: null,
  setChatId: (id: string) => set({ chatId: id }),
  clearChatId: () => set({ chatId: null }),
}));

// Storing chats and every first message for UI sidebar
interface ChatInterface {
  chatId: string;
  createdAt: string;
  firstMessage: string;
  messageId: string;
}

interface ListOfChatsState {
  chatsInfo: ChatInterface[];
  setChats: (chats: ChatInterface[]) => void;
  clearChats: () => void;
}

export const useListOfChatsState = create<ListOfChatsState>((set) => ({
  chatsInfo: [],
  setChats: (chats) => set({ chatsInfo: chats }),
  clearChats: () =>
    set({
      chatsInfo: [],
    }),
}));

// Store messages as a global variable
interface MessagesState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export const useMessageStore = create<MessagesState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
