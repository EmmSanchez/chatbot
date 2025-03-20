import { getChatsByUser } from "../model/postgresql/chatModel";

export async function getChatsByUserId(user_id: string) {
  try {
    const res = await getChatsByUser(user_id);

    /**
     * res ->
     * {
      chat_id: '8f4f22fa-b411-48f5-a6a8-de9c6233d722',
      message_id: 'fd531394-1086-4f0d-8e27-ca1aa704ba4d',
      first_message: 'Hola',
      created_at: 2025-03-10T12:44:13.841Z
    },
     */

    const mappedChats = res.map((chat) => ({
      chatId: chat.chat_id,
      createdAt: chat.message_id,
      firstMessage: chat.first_message,
      messageId: chat.created_at,
    }));

    return mappedChats;
  } catch (error) {
    console.error(error);
    return [];
  }
}
