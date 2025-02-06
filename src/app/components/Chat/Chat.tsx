"use client";
import { FormEvent, KeyboardEvent } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useChat } from "ai/react";
import { SendIcon, WandSparklesIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleKeyPress = (
    e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>
  ) => {
    if ("key" in e && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  console.log(messages);

  return (
    <>
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
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
            className="flex flex-col gap-4 justify-center items-center w-full px-4"
          >
            <div className="absolute -z-20 h-full w-[1000px] bg-white">
              <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1.5px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <h2 className="text-4xl text-center font-bold">
              Your AI-Powered Crypto Companion
            </h2>
            <p className="max-w-sm text-base text-center text-zinc-600">
              Automated, user-friendly chat for token swaps and crypto insights.
            </p>

            <form
              onSubmit={handleSubmit}
              className={`flex flex-col w-[840px] gap-2 bg-[#F9F9F7] rounded-2xl pb-2 px-3 border-solid border-[1px] border-zinc-200`}
            >
              <div className="flex max-h-64 pt-2">
                <WandSparklesIcon className="size-4 mt-3 text-zinc-600" />
                <TextAreaAutosize
                  autoFocus
                  maxLength={2000}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyPress(e)}
                  className="min-h-16 max-h-64 w-full resize-none px-3 py-2 rounded-md bg-transparent text-zinc-800 transition-all outline-none focus:outline-none placeholder:text-zinc-500 custom-scrollbar"
                  placeholder="Type your message..."
                ></TextAreaAutosize>
              </div>
              <div className="flex justify-end items-center gap-4 pt-2">
                <p className="text-xs text-zinc-400 tracking-wide">
                  {input.length}/2000
                </p>

                <button
                  disabled={input.trim().length === 0 || input.length > 2000}
                  type="submit"
                  className="group relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full bg-black font-medium text-white transition-all duration-200 hover:w-24 disabled:bg-zinc-300 border-solid border-[1px] disabled:border-zinc-400 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:hover:w-11"
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
        ) : (
          <div className="w-full flex justify-center px-4 overflow-y-auto">
            <ul className="flex flex-col justify-end w-[920px] gap-2 pb-20 pt-2">
              {messages.map((m) => {
                return (
                  <li
                    key={m.id}
                    className={`flex items-center px-2 py-2 max-w-[885px] gap-2 text-black  ${
                      m.role === "user"
                        ? "self-end text-sm text-zinc-800"
                        : "self-start text-sm text-zinc-800"
                    }`}
                  >
                    {m.role === "user" ? (
                      <UserMessage content={m.content} />
                    ) : (
                      <BotMessage content={m.content} />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="fixed bottom-0 pb-2">
              <form
                onSubmit={handleSubmit}
                className={`relative flex flex-col w-[840px] gap-2 bg-[#F9F9F7] rounded-2xl pb-2 px-3 border-solid border-[1px] border-zinc-200`}
              >
                <div
                  className={`flex max-h-64 pt-1 transition-all ${
                    input.length > 50 && "mb-10"
                  }`}
                >
                  <WandSparklesIcon className="size-4 mt-3 text-zinc-600" />
                  <TextAreaAutosize
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleKeyPress(e)}
                    className="max-h-32 w-full resize-none px-3 py-2 rounded-md text-zinc-800 bg-transparent transition-all outline-none focus:outline-none placeholder:text-zinc-500 custom-scrollbar"
                    placeholder="Type your message..."
                  ></TextAreaAutosize>
                </div>

                <div
                  className={`absolute bottom-0 right-2 flex justify-end items-center gap-4 py-2 px-2`}
                >
                  <p className="text-xs text-zinc-400 tracking-wide">
                    {input.length}/2000
                  </p>

                  <button
                    disabled={input.trim().length === 0 || input.length > 2000}
                    type="submit"
                    className="cursor-pointer p-2 rounded-full transition-all hover:bg-black hover:text-white disabled:bg-zinc-300 border-solid border-transparent border-[1px] disabled:border-zinc-400 disabled:text-zinc-400 disabled:cursor-not-allowed"
                  >
                    <SendIcon className="size-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
