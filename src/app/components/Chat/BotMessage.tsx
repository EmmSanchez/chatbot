import React from "react";

interface BotMessageProps {
  content: string;
}

export default function BotMessage({ content }: BotMessageProps) {
  return (
    <div className="flex gap-4">
      <div className="size-6 min-w-[24px] rounded-[8px] border-solid border-2 border-zinc-300"></div>
      <p className="whitespace-pre-wrap break-words overflow-x-hidden">
        {content}
      </p>
    </div>
  );
}
