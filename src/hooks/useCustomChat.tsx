import { usePrivy } from "@privy-io/react-auth";
import { Message, useChat } from "ai/react";
import { FormEvent, KeyboardEvent } from "react";
// import { useRouter } from "next/navigation";
// import { useChatStore, useUserStore } from "@/store/store";

type UseCustomChatOptions = {
  onFinish?: (message: Message) => Promise<void>;
};

export const useCustomChat = (options: UseCustomChatOptions = {}) => {
  const { onFinish } = options;
  const { authenticated, login } = usePrivy();

  const { messages, setMessages, input, handleInputChange, handleSubmit } =
    useChat({
      ...(onFinish ? { onFinish } : {}),
    });

  const handleSend = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | KeyboardEvent<HTMLTextAreaElement>
      | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!authenticated) return login();

    await handleSubmit();
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>
  ) => {
    if ("key" in e && e.key === "Enter") {
      e.preventDefault();
      handleSend(e);
    }
  };

  return {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    handleSend,
    // handleSendFirstMessage,
    handleKeyPress,
  };
};
