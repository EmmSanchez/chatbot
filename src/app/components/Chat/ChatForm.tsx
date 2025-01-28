import { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { SendIcon, WandSparklesIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import { useStore } from "@/store/store";
import { Message } from "@/types/types";

export function ChatForm() {
  const prompt = useStore((state) => state.prompt);
  const setPrompt = useStore((state) => state.setPrompt);
  const addMessage = useStore((state) => state.addMessage);

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const newPrompt = e.target.value;
    setPrompt(newPrompt);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>,
    role: "user" | "bot"
  ) => {
    e.preventDefault();

    if (prompt.trim()) {
      const newMessage: Message = {
        role: role,
        content: prompt,
        date: new Date(),
        status: "pending",
      };

      addMessage(newMessage);

      setPrompt("");
    }
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>
  ) => {
    if ("key" in e && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e, "user");
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, "user")}
      className="flex flex-col w-full gap-2 bg-[#F9F9F7] rounded-2xl pb-2 px-3 border-solid border-[1px] border-zinc-200"
    >
      <div className="flex max-h-64 pt-1">
        <WandSparklesIcon className="size-4 mt-3 text-zinc-600" />
        <TextAreaAutosize
          value={prompt}
          onChange={(e) => handleTextArea(e)}
          onKeyDown={(e) => handleKeyPress(e)}
          className="min-h-16 max-h-64 w-full resize-none px-3 py-2 rounded-md bg-transparent text-zinc-800 focus:outline-none placeholder:text-zinc-500"
          placeholder="Type your message..."
        ></TextAreaAutosize>
      </div>
      <div className="flex justify-end items-center gap-4">
        <p className="text-xs text-zinc-400 tracking-wide">
          {prompt.length}/2000
        </p>

        <button
          disabled={prompt.trim().length === 0}
          type="submit"
          className="group relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full bg-[#1091ea] font-medium text-white transition-all duration-200 hover:w-24 disabled:bg-[#e0effe] border-solid border-[1px] disabled:border-[#bbe0fc] disabled:text-[#bbe0fc] disabled:cursor-not-allowed disabled:hover:w-11"
        >
          <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 group-disabled:opacity-0">
            Send
          </div>
          <div className="absolute right-3.5">
            <SendIcon className="size-5" />
          </div>
        </button>
      </div>
    </form>
  );
}
