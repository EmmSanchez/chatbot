"use client";
import React, { useEffect } from "react";
import { FormEvent, KeyboardEvent } from "react";
import Messages from "@/app/components/Chat/Messages";
import { SendIcon, WandSparklesIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import { ChatRequestOptions, Message } from "ai";
import { useParams } from "next/navigation";

interface ChatContentProps {
  messages: Message[];
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void;
  input: string;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleKeyPress: (
    e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>
  ) => void;
}

export default function ChatContent({
  messages,
  setMessages,
  input,
  handleSubmit,
  handleInputChange,
  handleKeyPress,
}: ChatContentProps) {
  const { chatId } = useParams();
  // const setMessages = useMessageStore((state) => state.setMessages);
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

    fetchMessages();
  }, [chatId]);

  return (
    <div className="w-full flex justify-center px-4 overflow-y-auto">
      <Messages messages={messages} />

      <div className="fixed bottom-0 pb-2">
        <form
          onSubmit={handleSubmit}
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
