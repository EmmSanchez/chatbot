import { saveMessage } from "../model/postgresql/chatModel";

export async function addMessage(
  chat_id: string,
  user_id: string,
  rol: number,
  content: string
) {
  try {
    const res = await saveMessage(chat_id, user_id, rol, content);
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}
