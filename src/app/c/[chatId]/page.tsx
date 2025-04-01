"use client";
import React, { useEffect } from "react";
import Messages from "@/app/components/Chat/Messages";
import { SendIcon, WandSparklesIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import { useParams, useRouter } from "next/navigation";
import { useCustomChat } from "@/hooks/useCustomChat";
import { useChatStore, useUserStore } from "@/store/store";
import { Message } from "ai";

export default function ChatContent() {
  const { chatId } = useParams();
  const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);

  const isNewChat = useChatStore((state) => state.isNewChat);
  const setIsNewChat = useChatStore((state) => state.setIsNewChat);

  const saveMessage = async (
    chat_id: string,
    user_id: string,
    rol: "user" | "assistant",
    content: string
  ) => {
    if (!chat_id || !user_id || !content) return;

    try {
      const integerOfRol = rol === "user" ? 1 : 2;

      await fetch("/api/chat/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id, user_id, rol: integerOfRol, content }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const saveChat = async () => {
    try {
      const data = await fetch("/api/chat/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userInfo.id,
        }),
      });

      const { response, success } = await data.json();

      if (success && response?.id) {
        return response.id;
      } else {
        console.error("We couldn't save the chat");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSend,
    handleKeyPress,
  } = useCustomChat({
    onFinish: async (message: Message) => {
      let currentChatId = chatId as string;

      if (!currentChatId) {
        currentChatId = await saveChat();
        router.push(`/c/${currentChatId}`);
      }

      if (!currentChatId) return console.error("ChatId is needed");

      console.log(currentChatId);

      const user = {
        id: message.id,
        content: input,
        createdAt: message.createdAt,
        role: "user",
      };

      await saveMessage(currentChatId, userInfo.id, "user", user.content);

      const system = { ...message };
      await saveMessage(
        currentChatId,
        userInfo.id,
        "assistant",
        system.content
      );
    },
  });

  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/getChatData/${chatId}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch chat messages");
        }

        const { success, messages } = await res.json();
        if (success) {
          setMessages(messages);
        }
      } catch (error) {
        console.error("Error fetching chat data", error);
      }
    };

    if (isNewChat) {
      setIsNewChat(false);
      return;
    } else {
      fetchMessages();
    }
  }, [chatId]);

  return (
    <div className="w-full flex justify-center items-end h-[calc(100vh-80px)]">
      <Messages messages={messages} />

      <div className="fixed bottom-0 pb-2">
        <form
          onSubmit={handleSend}
          className={`relative flex flex-col w-[840px] gap-2 bg-[#F9F9F7] dark:bg-zinc-900 rounded-2xl pb-2 px-3 border-solid border-[1px] border-zinc-200 dark:border-zinc-800`}
        >
          <div
            className={`flex max-h-64 pt-1 transition-all ${
              input?.length > 50 && "mb-10"
            }`}
          >
            <WandSparklesIcon className="size-4 mt-3 text-zinc-600 dark:text-zinc-300" />
            <TextAreaAutosize
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => handleKeyPress(e)}
              className="max-h-32 w-full resize-none px-3 py-2 rounded-md text-zinc-800 dark:text-zinc-100 bg-transparent transition-all outline-none focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-300 custom-scrollbar"
              placeholder="Type your message..."
            ></TextAreaAutosize>
          </div>

          <div
            className={`absolute bottom-0 right-2 flex justify-end items-center gap-4 py-2 px-2`}
          >
            <p className="text-xs text-zinc-400 dark:text-zinc-300 tracking-wide">
              {input?.length}/2000
            </p>

            <button
              disabled={input?.trim().length === 0 || input?.length > 2000}
              type="submit"
              className="cursor-pointer p-2 rounded-full transition-all dark:text-white hover:bg-black dark:hover:bg-[#1091ea] hover:text-white disabled:bg-zinc-300 border-solid border-transparent border-[1px] disabled:border-zinc-400 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:border-zinc-700 dark:disabled:text-zinc-700 disabled:cursor-not-allowed"
            >
              <SendIcon className="size-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
