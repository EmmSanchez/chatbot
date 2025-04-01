import React from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import { Message } from "ai";

interface MessagesProps {
  messages: Message[];
}

export default function Messages({ messages }: MessagesProps) {
  return (
    <ul className="flex flex-col w-[920px] gap-2 mb-32 -mt-8">
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
    </ul>
  );
}
