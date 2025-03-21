import { getChatMessagesById } from "../model/postgresql/chatModel";

export async function getChatById(id: string) {
  try {
    const res = await getChatMessagesById(id);

    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}
