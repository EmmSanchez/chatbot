import { useStore } from "@/store/store";
import { ChatForm } from "./ChatForm";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

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
            className="flex flex-col gap-4 justify-center items-center w-[840px] px-4"
          >
            <h2 className="text-4xl text-center font-bold">
              Your{" "}
              <span className="bg-gradient-to-br from-[#3aaaf6] to-[#0470c5] text-transparent bg-clip-text">
                AI-Powered
              </span>{" "}
              Crypto Companion
            </h2>
            <p className="max-w-sm text-base text-center text-zinc-600">
              Automated, user-friendly chat for token swaps and crypto insights.
            </p>

            <ChatForm />
          </motion.div>
        ) : (
          <ul>
            {messages.map((message, index) => {
              return <li key={index}>{message.content}</li>;
            })}
          </ul>
        )}
      </AnimatePresence>
    </>
  );
}
