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
  // const router = useRouter();
  // const setChatId = useChatStore((state) => state.setChatId);
  // const userInfo = useUserStore((state) => state.userInfo);
  // const setIsNewChat = useChatStore((state) => state.setIsNewChat);

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

  // const saveChat = async () => {
  //   try {
  //     const data = await fetch("/api/chat/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user_id: userInfo.id,
  //       }),
  //     });

  //     const { response, success } = await data.json();

  //     if (success && response?.id) {
  //       return response.id;
  //     } else {
  //       console.error("We couldn't save the chat");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  // const handleSendFirstMessage = async (
  //   e:
  //     | React.MouseEvent<HTMLButtonElement, MouseEvent>
  //     | KeyboardEvent<HTMLTextAreaElement>
  //     | FormEvent<HTMLFormElement>
  // ) => {
  //   e.preventDefault();
  //   if (!authenticated) return login();

  //   const currentId = await saveChat();
  //   setChatId(currentId);
  //   if (!currentId) {
  //     console.error("Error creating new chat");
  //     return;
  //   }

  //   setIsNewChat(true);
  //   console.log("currentId:", currentId);
  //   router.push(`/c/${currentId}`);

  //   await handleSubmit();
  // };

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
