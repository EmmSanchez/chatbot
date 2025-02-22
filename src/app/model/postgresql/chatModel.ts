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
      console.log("user exists");

      return existingUser.rows[0];
    }

    // If not exists, save it
    const newUser = await pool.query(
      "INSERT INTO users (privy_user_id, username) VALUES ($1, $2) RETURNING *",
      [userId, username]
    );

    console.log("new user");
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

// export async function createChat() {}

// export async function addNewUser() {}
