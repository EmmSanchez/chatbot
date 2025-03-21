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

export async function getChatsByUser(userId: string) {
  try {
    const chats = await pool.query(
      `SELECT DISTINCT ON (a.id) 
          a.id AS chat_id, 
          b.id AS message_id, 
          b.content AS first_message, 
          b.created_at  
       FROM chats a
       JOIN messages b ON a.id = b.chat_id
       WHERE a.user_id = $1
       ORDER BY a.id, b.created_at ASC`,
      [userId]
    );

    if (chats.rowCount) {
      return chats.rows;
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getChatMessagesById(id: string) {
  try {
    const messages = await pool.query(
      `SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC`,
      [id]
    );

    if (messages.rowCount) {
      return messages.rows;
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createChat(user_id: string) {
  try {
    const newChat = await pool.query(
      "INSERT INTO chats (user_id) VALUES ($1) RETURNING *",
      [user_id]
    );

    if (!newChat) {
      throw new Error("Error trying to save chat");
    }

    return newChat.rows[0];
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
