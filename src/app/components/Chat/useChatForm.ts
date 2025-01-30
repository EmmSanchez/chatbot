import { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useStore } from "@/store/store";
import { Message } from "@/types/types";

export const useChatForm = () => {
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

  return {
    prompt,
    handleTextArea,
    handleSubmit,
    handleKeyPress,
  };
};
