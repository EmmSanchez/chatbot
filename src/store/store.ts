import { create } from "zustand";
// import { Message } from "@/types/types";

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
