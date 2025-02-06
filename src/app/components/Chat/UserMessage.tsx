import React from "react";

interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex gap-4 items-center">
      <p className="whitespace-pre-wrap break-words overflow-x-hidden">
        {content}
      </p>
      <div className="size-6 bg-blue-500 rounded-[8px]"></div>
    </div>
  );
}
