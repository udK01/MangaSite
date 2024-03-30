import mysql from "mysql2";
import dotenv from "dotenv";

// Fetching connection info.
dotenv.config({ path: "./.env" });

// Establishing connection.
const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

// Users
/**
 *
 * Creates new users with the inputted username and password,
 * default profile picture, empty bookmarks and lowest access level.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Admittedly, I will probably refactor it. Make a single admin account
 * and add a function for altering access level.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Authority: 0 - User
 *            1 - Moderator
 *            2 - Admin
 *
 * @param {string} username The username given by the user.
 * @param {string} password The password given by the user.
 * @param {integer} accessLevel The level of authority the user is granted.
 */
export async function createUser(username, password, accessLevel = 0) {
  try {
    // Temporary "Default" Profile Picture.
    const defaultProfilePicture = "../public/vite.svg";

    // Sql Query.
    const query = `
      INSERT INTO Users (Username, Password, Profile_Picture, Bookmarks, Access_Level)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Values To Enter.
    const values = [
      username,
      password,
      defaultProfilePicture,
      JSON.stringify([]),
      accessLevel,
    ];

    // Add & Feedback.
    await db.query(query, values);
  } catch (error) {
    // Error Handling For Duplicate Usernames.
    if (error.code === "ER_DUP_ENTRY") {
      console.error(`Username "${username}" already exists.`);
    } else {
      console.error("Failed to create new user:", error);
    }
  }
}

/**
 *
 * Deletes the user with the specified username.
 *
 * @param {string} username The username of the user to be deleted.
 */
export async function deleteUser(username) {
  try {
    await db.query(`DELETE FROM Users WHERE Username = ?`, [username]);
  } catch (error) {
    console.error(`Failed to delete user:`, error);
  }
}

/**
 *
 * Fetches the user based on username.
 *
 * @param {string} username The user's username.
 * @returns the user.
 */
export async function getUser(username) {
  try {
    return (
      await db.query(`SELECT * FROM Users WHERE username = ?`, [username])
    )[0];
  } catch (error) {
    console.error(`Failed to fetch user:`, error);
  }
}

/**
 *
 * Finds user, checks if they entered the
 * correct password and changes it to a new one.
 *
 * @param {int} userID The user's unique ID.
 * @param {string} oldPassword The user's old password.
 * @param {string} newPassword The user's new password.
 */
export async function changePassword(userID, oldPassword, newPassword) {
  try {
    const [user] = await db.query(`SELECT * FROM Users WHERE userID = ?`, [
      userID,
    ]);
    if (user[0].password === oldPassword) {
      const query = `UPDATE Users SET Password = ? WHERE userID = ?`;
      const values = [newPassword, userID];
      await db.query(query, values);
    }
  } catch (error) {
    console.error(`Failed to change password!`, error);
  }
}
