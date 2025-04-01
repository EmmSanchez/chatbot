import React, { useRef, useState, useEffect } from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import { Message } from "ai";
import { ArrowDown } from "lucide-react";

interface MessagesProps {
  messages: Message[];
}

export default function Messages({ messages }: MessagesProps) {
  const messagesContainerRef = useRef<HTMLUListElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Referencia al div al final
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const isBottom =
        messagesContainerRef.current.scrollHeight -
          messagesContainerRef.current.scrollTop -
          messagesContainerRef.current.clientHeight <=
        2;
      setIsAtBottom(isBottom);
    }
  };

  useEffect(() => {
    // Scroll al fondo al cargar los mensajes
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  return (
    <>
      <ul
        ref={messagesContainerRef}
        className="grid items-end place-items-center w-full h-full gap-2 overflow-y-scroll pb-8 pl-[10px]"
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

        {/* Este div actúa como ancla al final */}
        <div ref={messagesEndRef} />
      </ul>

      {/* Scroll to bottom button */}
      {!isAtBottom && (
        <div className="absolute flex justify-center w-full bottom-20">
          <ArrowDown
            onClick={scrollToBottom}
            className="box-content size-5 p-1 rounded-[8px] bg-[#232227] text-zinc-300 border-solid border-[1px] border-zinc-600 hover:cursor-pointer hover:bg-zinc-700"
          />
        </div>
      )}
    </>
  );
}
