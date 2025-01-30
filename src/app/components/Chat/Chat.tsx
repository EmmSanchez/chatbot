import { useStore } from "@/store/store";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { HeroChatForm } from "./HeroChatForm";
import { DynamicChatForm } from "./DynamicChatForm";

export default function Chat() {
  const messages = useStore((state) => state.messages);

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

            <HeroChatForm />
          </motion.div>
        ) : (
          <div className="w-full flex justify-center px-4">
            <ul className="flex flex-col w-[1024px] h-dvh gap-2 pb-16 bg-cyan-300 overflow-y-auto">
              {messages.map((message, index) => {
                return (
                  <li
                    key={index}
                    className={`flex px-4 py-2 bg-white text-black border-solid border-[1px] border-zinc-300 rounded-xl shadow-md ${
                      message.role === "user" ? "self-end" : "self-start"
                    }`}
                  >
                    {message.content}
                  </li>
                );
              })}
            </ul>

            <div className="absolute bottom-0 pb-2">
              <DynamicChatForm />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
