import { findOrCreateUser } from "../model/postgresql/chatModel";

export async function logInUser(userId: string, username: string) {
  const user = await findOrCreateUser(userId, username);

  console.log(user);

  return user;
}

// export async function saveChat(req, res) {}

// export async function fetchChats(req, res) {}
