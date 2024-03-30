import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

// Users

async function createUser(username, password, accessLevel = 0) {
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
    console.log(`Created user: ${username}`);
  } catch (error) {
    // Error Handling For Duplicate Usernames.
    if (error.code === "ER_DUP_ENTRY") {
      console.error(`Username "${username}" already exists.`);
    } else {
      console.error("Failed to create new user:", error);
    }
  }
}

await createUser(`Steve`, `password`, `0`);
