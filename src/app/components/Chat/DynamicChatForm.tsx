import { SendIcon, WandSparklesIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import { useChatForm } from "./useChatForm";

export function DynamicChatForm() {
  const { prompt, handleSubmit, handleTextArea, handleKeyPress } =
    useChatForm();

  return (
    <form
      onSubmit={(e) => handleSubmit(e, "user")}
      className={`relative flex flex-col w-[840px] gap-2 bg-[#F9F9F7] rounded-2xl pb-2 px-3 border-solid border-[1px] border-zinc-200`}
    >
      <div
        className={`flex max-h-64 pt-1 transition-all ${
          prompt.length > 55 && "mb-10"
        }`}
      >
        <WandSparklesIcon className="size-4 mt-3 text-zinc-600" />
        <TextAreaAutosize
          value={prompt}
          onChange={(e) => handleTextArea(e)}
          onKeyDown={(e) => handleKeyPress(e)}
          className="max-h-32 w-full resize-none px-3 py-2 rounded-md text-zinc-800 bg-transparent transition-all outline-none focus:outline-none placeholder:text-zinc-500 custom-scrollbar"
          placeholder="Type your message..."
        ></TextAreaAutosize>
      </div>

      <div
        className={`absolute bottom-0 right-2 flex justify-end items-center gap-4 py-2 px-2`}
      >
        <p className="text-xs text-zinc-400 tracking-wide">
          {prompt.length}/2000
        </p>

        <button className="cursor-pointer p-2 rounded-full transition-all hover:bg-black hover:text-white">
          <SendIcon className="size-5" />
        </button>
      </div>
    </form>
  );
}
