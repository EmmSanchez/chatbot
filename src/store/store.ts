import { create } from "zustand";
import { Message } from "ai/react";

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
  isNewChat: boolean;
  setIsNewChat: (value: boolean) => void;
  inputCopy: string | null;
  setInputCopy: (input: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatId: null,
  setChatId: (id: string) => set({ chatId: id }),
  clearChatId: () => set({ chatId: null }),
  isNewChat: false,
  setIsNewChat: (value: boolean) => set({ isNewChat: value }),
  inputCopy: null,
  setInputCopy: (input: string) => set({ inputCopy: input }),
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
  messagesCopy: Message[];
  setMessagesCopy: (messages: Message[]) => void;
}

export const useMessageStore = create<MessagesState>((set) => ({
  messagesCopy: [],
  setMessagesCopy: (messages) => set({ messagesCopy: messages }),
}));

// Variables for UI
interface UIState {
  isAtBottom: boolean;
  setIsAtBottom: (value: boolean) => void;
  hasContainerScroll: boolean;
  setHasContainerScroll: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAtBottom: true,
  setIsAtBottom: (value: boolean) => set({ isAtBottom: value }),
  hasContainerScroll: false,
  setHasContainerScroll: (value: boolean) => set({ hasContainerScroll: value }),
}));
