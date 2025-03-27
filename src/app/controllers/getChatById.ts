import { Message } from "ai";
import { getChatMessagesById } from "../model/postgresql/chatModel";

export async function getChatById(id: string) {
  try {
    const res = await getChatMessagesById(id);

    // Received data
    //   {
    //     "id": "d3740636-a978-45cc-b5e9-1ccd98dcbcea",
    //     "chat_id": "cfce3fe4-d861-43cd-a708-9645e4dfc185",
    //     "sender_id": "517b0344-4044-4046-bf9c-bbdb4102ed3d",
    //     "rol": 1,
    //     "content": "Hola",
    //     "created_at": "2025-03-21T07:56:54.661Z"
    //  }

    /**
     * Mapping received data for model Message
     */
    const mappedData: Message[] = res.map((message) => ({
      id: message.id as string,
      createdAt: message.created_at as Date,
      role: message.rol === 1 ? "user" : "assistant",
      content: message.content as string,
    }));

    return mappedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
