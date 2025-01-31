import { SendIcon, WandSparklesIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import { useChatForm } from "./useChatForm";

export function HeroChatForm() {
  const { prompt, handleSubmit, handleTextArea, handleKeyPress } =
    useChatForm();
  return (
    <form
      onSubmit={(e) => handleSubmit(e, "user")}
      className={`flex flex-col w-[840px] gap-2 bg-[#F9F9F7] rounded-2xl pb-2 px-3 border-solid border-[1px] border-zinc-200`}
    >
      <div className="flex max-h-64 pt-2">
        <WandSparklesIcon className="size-4 mt-3 text-zinc-600" />
        <TextAreaAutosize
          autoFocus
          maxLength={2000}
          value={prompt}
          onChange={(e) => handleTextArea(e)}
          onKeyDown={(e) => handleKeyPress(e)}
          className="min-h-16 max-h-64 w-full resize-none px-3 py-2 rounded-md bg-transparent text-zinc-800 transition-all outline-none focus:outline-none placeholder:text-zinc-500 custom-scrollbar"
          placeholder="Type your message..."
        ></TextAreaAutosize>
      </div>
      <div className="flex justify-end items-center gap-4 pt-2">
        <p className="text-xs text-zinc-400 tracking-wide">
          {prompt.length}/2000
        </p>

        <button
          disabled={prompt.trim().length === 0 || prompt.length > 2000}
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
  );
}
