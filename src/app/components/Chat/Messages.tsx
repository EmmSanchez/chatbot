import React, { useRef, useEffect } from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import { Message } from "ai";
import { useUIStore } from "@/store/store";

interface MessagesProps {
  messages: Message[];
  onRefReady: (ref: HTMLUListElement | null) => void;
}

export default function Messages({ messages, onRefReady }: MessagesProps) {
  const messagesContainerRef = useRef<HTMLUListElement>(null);
  const setIsAtBottom = useUIStore((state) => state.setIsAtBottom);
  const hasContainerScroll = useUIStore((state) => state.hasContainerScroll);
  const setHasContainerScroll = useUIStore(
    (state) => state.setHasContainerScroll
  );

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current?.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;

      // Total Height - ( actual scroll height + user view ), if the result is near to 0, there is no more scrollable space
      const isBottom =
        hasContainerScroll &&
        container.scrollHeight - container.scrollTop - container.clientHeight <=
          2;

      setIsAtBottom(isBottom);
    }
  };

  useEffect(() => {
    // Checking if it has scroll
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;

      const hasContainerScroll =
        container.scrollHeight > container.clientHeight;
      setHasContainerScroll(hasContainerScroll);

      if (hasContainerScroll) scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    onRefReady(messagesContainerRef.current);
  }, [onRefReady]);

  return (
    <>
      <ul
        ref={messagesContainerRef}
        className="grid items-end place-items-center w-full h-full gap-2 overflow-y-auto pb-8 pl-[10px]"
        onScroll={handleScroll}
      >
        <div className="flex flex-col w-[840px]">
          {messages?.map((m) => {
            return (
              <li
                key={m.id}
                className={`flex items-center px-2 py-2 max-w-[885px] gap-2 text-black dark:text-zinc-100 ${
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
        </div>
      </ul>
    </>
  );
}
