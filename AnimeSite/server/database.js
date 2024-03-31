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

/////////
//Users//
/////////

/**
 *
 * Creates new users with the inputted username and password,
 * default profile picture and lowest access level.
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
 * Example Usage.
 *
 * await createUser("username", "password");
 *
 * @param {string} username The username given by the user.
 * @param {string} password The password given by the user.
 * @param {integer} accessLevel The level of authority the user is granted.
 *
 */
export async function createUser(username, password, accessLevel = 0) {
  try {
    // Temporary "Default" Profile Picture.
    const defaultProfilePicture = "../public/vite.svg";

    // Sql Query.
    const query = `
      INSERT INTO Users (username, password, profilePicture, accessLevel)
      VALUES (?, ?, ?, ?)
    `;

    // Values To Enter.
    const values = [username, password, defaultProfilePicture, accessLevel];

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
 * Example Usage.
 *
 * await deleteUser("udk");
 *
 * @param {string} username The username of the user to be deleted.
 *
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
 * Example Usage.
 *
 * await getUser("udk");
 *
 * @param {string} username The user's username.
 * @returns the user.
 *
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
 * Example Usage.
 *
 * await changePassword(1, "password", "password123");
 *
 * @param {int} userID The user's unique ID.
 * @param {string} oldPassword The user's old password.
 * @param {string} newPassword The user's new password.
 *
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

/**
 *
 * Changes the user's profile picture.
 *
 * @param {int} userID The user's unique ID.
 * @param {string} profilePicture A path to the new picture.
 *
 * Example Usage.
 *
 * await changeProfilePicture(1, "...");
 *
 */
export async function changeProfilePicture(userID, profilePicture) {
  try {
    const query = `UPDATE Users SET profilePicture = ? WHERE userID = ?`;
    const values = [profilePicture, userID];
    await db.query(query, values);
  } catch (error) {
    console.error(`Failed to change pictures:`, error);
  }
}

/////////////
//Bookmarks//
/////////////

/**
 *
 * Adds or removes a bookmark.
 *
 * Example Usage
 *
 * await alterBookmarks(1,1,"add");
 *
 * @param {int} userID The users's unique identifier.
 * @param {int} mangaID The manga's unique identifier.
 * @param {string} action The action to "add/remove".
 *
 */
export async function alterBookmarks(userID, mangaID, action) {
  try {
    switch (action) {
      case "add":
        await db.query(
          `INSERT INTO user_bookmarks (userID, mangaID) VALUES (?, ?)`,
          [userID, mangaID]
        );
        break;
      case "remove":
        await db.query(
          `DELETE FROM user_bookmarks WHERE userID = ? AND mangaID = ?`,
          [userID, mangaID]
        );
        break;
    }
  } catch (error) {
    console.error(`Failed to add bookmark:`, error);
  }
}

/**
 *
 * Takes the userID as input and returns
 * an array of bookmark objects.
 *
 * @param {int} userID The user's unique identifier.
 * @returns An array of bookmark objects.
 */
export async function getBookmarks(userID) {
  try {
    const result = await db.query(
      `SELECT mangaID FROM user_bookmarks WHERE userID = ?`,
      [userID]
    );
    return result[0];
  } catch (error) {
    console.error(`Couldn't get bookmarks!`);
  }
}

//////////
//Mangas//
//////////

/**
 *
 * Creates a new comic with the specified title,
 * image, type, description, author and status.
 *
 * Example Usage.
 *
 * await createComic(
 *  `Comic 2`,
 *  `Cat or Dogs?`,
 *  `14`,
 *  `Manga`,
 *  `The sneaky cat, pushed the dull dog...`,
 *  `FoxLover`,
 *  `OnGoing`
 * );
 *
 * @param {string} mangaTitle The comic's title.
 * @param {string} mangaImage The comic's image.
 * @param {int} totalChapters The comic's cumulative chapters.
 * @param {string} type The comic's type.
 * @param {string} description The comic's description.
 * @param {string} author The comic's author.
 * @param {string} status The comic's status.
 *
 */
async function createComic(
  mangaTitle,
  mangaImage,
  totalChapters,
  type,
  description,
  author,
  status
) {
  try {
    let defaultRating = 0;

    // Sql Query.
    const query = `
      INSERT INTO Mangas (mangaTitle, mangaImage, totalChapters, rating, type, description, author, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Values To Enter.
    const values = [
      mangaTitle,
      mangaImage,
      totalChapters,
      defaultRating,
      type,
      description,
      author,
      status,
    ];

    await db.query(query, values);
  } catch (error) {
    console.error(`Couldn't create comic:`, error);
  }
}
