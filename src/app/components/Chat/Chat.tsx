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
          <div className="w-full flex justify-center px-4 overflow-y-auto">
            <ul className="flex flex-col justify-end w-[840px] gap-2 pb-20 pt-2">
              {messages.map((message, index) => {
                return (
                  <li
                    key={index}
                    className={`flex tems-center px-4 py-2 max-w-[774px] gap-2 text-black  ${
                      message.role === "user"
                        ? "self-end text-sm text-zinc-600"
                        : "self-start"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words overflow-x-hidden">
                      {message.content}
                    </p>

                    {message.role === "user" ? (
                      <div className="size-6 bg-green-400 rounded-full"></div>
                    ) : (
                      <></>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="fixed bottom-0 pb-2">
              <DynamicChatForm />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
