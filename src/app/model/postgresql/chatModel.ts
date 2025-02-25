import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
});

export async function findOrCreateUser(userId: string, username: string) {
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE privy_user_id = $1",
      [userId]
    );

    // If the user exists just return
    if (existingUser.rowCount) {
      return existingUser.rows[0];
    }

    // If not exists, save it
    const newUser = await pool.query(
      "INSERT INTO users (privy_user_id, username) VALUES ($1, $2) RETURNING *",
      [userId, username]
    );

    return newUser.rows[0];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// export async function getChatsByUser(userId: string) {
//   try {
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

export async function createChat(user_id: string) {
  try {
    const newChat = await pool.query(
      "INSER INTO chats (user_id) VALUES ($1) RETURNING *",
      [user_id]
    );
    if (!newChat) {
      throw new Error("Error trying to save chat");
    }

    return newChat;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function saveMessage(
  chat_id: string,
  user_id: string,
  rol: number,
  content: string
) {
  try {
    const res = await pool.query(
      "INSERT INTO messages (chat_id, sender_id, rol, content) VALUES ($1, $2, $3, $4) RETURNING *",
      [chat_id, user_id, rol, content]
    );

    if (!res) {
      throw new Error("Error in the query");
    }

    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}
