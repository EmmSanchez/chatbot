import { usePrivy } from "@privy-io/react-auth";
import { Message, useChat } from "ai/react";
import { FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useChatStore, useMessageStore, useUserStore } from "@/store/store";
import { MessageType, TYPES_OF_MESSAGES } from "@/types/types";
import { generateId } from "ai";

type UseCustomChatOptions = {
  onFinish?: (message: Message) => Promise<void>;
};

export const useCustomChat = (options: UseCustomChatOptions = {}) => {
  const { onFinish } = options;
  const { authenticated, login } = usePrivy();
  const router = useRouter();
  const setChatId = useChatStore((state) => state.setChatId);
  const userInfo = useUserStore((state) => state.userInfo);
  const setIsNewChat = useChatStore((state) => state.setIsNewChat);

  const setMessagesCopy = useMessageStore((state) => state.setMessagesCopy);

  const saveChat = async () => {
    try {
      const data = await fetch("/api/chat/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userInfo.id,
        }),
      });

      const { response, success } = await data.json();

      if (success && response?.id) {
        return response.id;
      } else {
        console.error("We couldn't save the chat");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  // const saveMessage = async (
  //   chat_id: string,
  //   user_id: string,
  //   rol: "user" | "assistant",
  //   content: string
  // ) => {
  //   try {
  //     const integerOfRol = rol === "user" ? 1 : 2;

  //     await fetch("/api/chat/messages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ chat_id, user_id, rol: integerOfRol, content }),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const {
    messages,
    setMessages,
    input,
    append,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useChat({
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

  const handleSendFirstMessage = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | KeyboardEvent<HTMLTextAreaElement>
      | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!authenticated) return login();

    const currentChatId = await saveChat();

    if (!currentChatId) {
      console.error("Error creating new chat");
      return;
    }

    setChatId(currentChatId);
    router.push(`/c/${currentChatId}`);

    const firstMessage: Message = {
      id: generateId(),
      createdAt: new Date(),
      role: "user",
      content: input,
    };

    setMessagesCopy([
      {
        id: firstMessage.id,
        role: "user",
        content: firstMessage.content,
        createdAt: firstMessage.createdAt,
      },
    ]);

    setIsNewChat(true);
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>,
    message_type: MessageType
  ) => {
    if ("key" in e && e.key === "Enter") {
      e.preventDefault();

      if (message_type === TYPES_OF_MESSAGES.FIRST_MESSAGE) {
        handleSendFirstMessage(e);
      } else if (message_type === TYPES_OF_MESSAGES.NORMAL_MESSAGE) {
        handleSend(e);
      }
    }
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    append,
    handleInputChange,
    handleSubmit,
    handleSend,
    handleSendFirstMessage,
    handleKeyPress,
  };
};
