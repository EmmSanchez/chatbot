"use client";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useCustomChat } from "@/hooks/useCustomChat";
import { SendIcon, WandSparklesIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import { useListOfChatsState, useUserStore } from "@/store/store";
import { usePrivy } from "@privy-io/react-auth";
import { TYPES_OF_MESSAGES } from "@/types/types";

export default function Chat() {
  // const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);
  // const chatId = useChatStore((state) => state.chatId);
  const setChats = useListOfChatsState((state) => state.setChats);
  const { authenticated } = usePrivy();

  const {
    messages,
    input,
    handleInputChange,
    handleSendFirstMessage,
    handleKeyPress,
  } = useCustomChat({});

  useEffect(() => {
    if (!authenticated || !userInfo.id) return;

    const getChatsByUserId = async () => {
      try {
        const res = await fetch(`/api/chat/getChats?user_id=${userInfo.id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch chats");
        }

        const { success, response } = await res.json();

        if (success && response) {
          setChats(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getChatsByUserId();
  }, [authenticated, userInfo]);

  return (
    <>
      <AnimatePresence mode="wait">
        {messages.length === 0 && (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.4,
              type: "tween",
              ease: "backInOut",
            }}
            className="flex flex-col gap-4 justify-center items-center w-full h-full px-4"
          >
            <h2 className="text-4xl text-center font-bold dark:text-zinc-100">
              Your AI-Powered Friendly Asistant
            </h2>
            <p className="max-w-sm text-base text-center text-zinc-600 dark:text-zinc-400">
              Automated, user-friendly chat for smarter interactions and instant
              support
            </p>

            <form
              onSubmit={(e) => handleSendFirstMessage(e)}
              className={`flex flex-col w-[840px] gap-2 bg-[#F9F9F7] dark:bg-zinc-900 rounded-2xl pb-2 px-3 border-solid border-[1px] border-zinc-200 dark:border-zinc-800`}
            >
              <div className="flex max-h-64 pt-2">
                <WandSparklesIcon className="size-4 mt-3 text-zinc-600 dark:text-zinc-300" />
                <TextAreaAutosize
                  autoFocus
                  maxLength={2000}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) =>
                    handleKeyPress(e, TYPES_OF_MESSAGES.FIRST_MESSAGE)
                  }
                  className="min-h-16 max-h-64 w-full resize-none px-3 py-2 rounded-md bg-transparent text-zinc-800 dark:text-zinc-100 transition-all outline-none focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-300 custom-scrollbar"
                  placeholder="Type your message..."
                ></TextAreaAutosize>
              </div>
              <div className="flex justify-end items-center gap-4 pt-2">
                <p className="text-xs text-zinc-400 dark:text-zinc-300 tracking-wide">
                  {input.length}/2000
                </p>

                <button
                  disabled={input.trim().length === 0 || input.length > 2000}
                  type="submit"
                  className="group relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full bg-black dark:bg-[#1091ea] font-medium text-white transition-all duration-200 hover:w-24 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 border-solid border-[1px] dark:border-[#1091ea] disabled:border-zinc-400 disabled:text-zinc-400 dark:disabled:border-zinc-700 dark:disabled:text-zinc-700 disabled:cursor-not-allowed disabled:hover:w-11"
                >
                  <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 group-disabled:opacity-0">
                    Send
                  </div>
                  <div className="absolute right-[12px]">
                    <SendIcon className="size-5" />
                  </div>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
