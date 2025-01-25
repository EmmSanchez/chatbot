// import { motion } from "motion/react";
import { ForwardIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
export default function Chat() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="text-7xl text-center font-bold">What’s our next trade?</h2>
      <p className="max-w-2xl text-lg text-center text-zinc-600">
        I&apos;m your crypto assistant, here to help you trade, swap, and manage
        your tokens effortlessly
      </p>

      <div className="w-full bg-white rounded-2xl p-1 border-solid border-[1px] border-zinc-200">
        <TextAreaAutosize
          className="max-h-64 mt-2 w-full resize-none px-3 py-2 rounded-md text-zinc-600 focus:outline-none"
          placeholder="Type your message..."
        ></TextAreaAutosize>
        <div className="flex justify-end">
          <button className="flex justify-center items-center p-2 rounded-full hover:bg-[#F5F5F5] transition-colors ease-in-out">
            <ForwardIcon className="rotate-180 scale-x-[-1]" />
          </button>
        </div>
      </div>
    </div>
  );
}
