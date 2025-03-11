import { getChatsByUser } from "../model/postgresql/chatModel";

export async function getChatsByUserId(user_id: string) {
  try {
    const res = await getChatsByUser(user_id);

    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}
