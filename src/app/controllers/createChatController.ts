import { createChat } from "../model/postgresql/chatModel";

export async function addNewChat(user_id: string) {
  try {
    const newChat = await createChat(user_id);
    return newChat;
  } catch (error) {
    console.error(error);
    return [];
  }
}
