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
 * Example Usage.
 *
 * await changeProfilePicture(1, "...");
 *
 * @param {int} userID The user's unique ID.
 * @param {string} profilePicture A path to the new picture.
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

/**
 *
 * Alters the specified user's access level.
 *
 * Example Usage.
 *
 * await changeAccessLevel("udK", 1);
 *
 * @param {string} username The name of the user.
 * @param {int} accessLevel New access level.
 */
export async function changeAccessLevel(username, accessLevel) {
  try {
    await db.query(`UPDATE Users SET accessLevel = ? WHERE username = ?`, [
      accessLevel,
      username,
    ]);
  } catch (error) {
    console.error(`Failed to change access level:`, error);
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
 * Example Usage.
 *
 * await getBookmarks(2);
 *
 * @param {int} userID The user's unique identifier.
 * @returns An array of bookmark objects.
 */
export async function getBookmarks(userID) {
  try {
    return (
      await db.query(`SELECT mangaID FROM user_bookmarks WHERE userID = ?`, [
        userID,
      ])
    )[0];
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
 *  `Manga`,
 *  `The sneaky cat, pushed the dull dog...`,
 *  `FoxLover`,
 *  `OnGoing`
 * );
 *
 * @param {string} mangaTitle The comic's title.
 * @param {string} mangaImage The comic's image.
 * @param {string} type The comic's type.
 * @param {string} description The comic's description.
 * @param {string} author The comic's author.
 * @param {string} status The comic's status.
 *
 */
export async function createManga(
  mangaTitle,
  mangaImage,
  type,
  description,
  author,
  status
) {
  try {
    let defaultRating = 0;

    // Sql Query.
    const query = `
      INSERT INTO Mangas (mangaTitle, mangaImage, rating, type, description, author, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Values To Enter.
    const values = [
      mangaTitle,
      mangaImage,
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

/**
 *
 * Simply returns all of our stored data.
 *
 * Example Usage.
 *
 * await getMangas();
 *
 * @returns Every manga from our database.
 */
export async function getMangas() {
  try {
    return (await db.query(`SELECT * FROM mangas`))[0];
  } catch (error) {
    console.error(`Failed to fetch mangas:`, error);
  }
}

/**
 *
 * Counts and returns the total number of chapters
 * for the specified manga.
 *
 * Example Usage.
 *
 * await getTotalChapters(2);
 *
 * @param {int} mangaID The manga's unique identifier.
 * @returns The total number of chapters.
 */
export async function getTotalChapters(mangaID) {
  try {
    return (
      await db.query(
        `SELECT COUNT(*) AS count FROM chapters WHERE mangaID = ?`,
        [mangaID]
      )
    )[0][0].count;
  } catch (error) {
    console.error(`Couldn't get total chapters:`, error);
  }
}

/**
 *
 * Finds the comic based on ID and updates
 * any changes values.
 *
 * Example Usage.
 *
 * updateManga(
 *  1,
 *  "Restlessness",
 *  "Restless.png",
 *  "4.76",
 *  "Manhua",
 *  "Soldiers brimming with restlessness...",
 *  "udK",
 *  "OnGoing"
 * );
 *
 * @param {int} mangaID The comic's unique identifier.
 * @param {string} mangaTitle The comic's title.
 * @param {string} mangaImage The comic's image.
 * @param {float} rating The comic's rating.
 * @param {string} type The comic's type.
 * @param {string} description The comic's description.
 * @param {string} author The comic's author.
 * @param {string} status The comic's status.
 */
export async function updateManga(
  mangaID,
  mangaTitle,
  mangaImage,
  rating,
  type,
  description,
  author,
  status
) {
  try {
    // SQL Query.
    const query = `
  UPDATE Mangas 
  SET mangaTitle = ?, mangaImage = ?, rating = ?, type = ?, description = ?, author = ?, status = ? 
  WHERE mangaID = ?
`;

    // Values To Enter.
    const values = [
      mangaTitle,
      mangaImage,
      rating,
      type,
      description,
      author,
      status,
      mangaID,
    ];

    await db.query(query, values);
  } catch (error) {
    console.error(`Failed to update manga:`, error);
  }
}

////////////
//Chapters//
////////////

/**
 *
 * Creates a new chapter for the specified manga with the
 * inputted number, title and content.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *   May change "chapterNumber" for autoincrement later.   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Example Usage.
 *
 * await createChapter(2, 16, "Plated Escort", "The treacherous tale of Sun-Min Woo, The Plates Escort.");
 *
 * @param {int} mangaID The manga's unique identifier.
 * @param {int} chapterNumber The chapter's number.
 * @param {string} chapterTitle The chapter's title.
 * @param {string} chapterContent The chapter's content.
 */
export async function createChapter(
  mangaID,
  chapterNumber,
  chapterTitle,
  chapterContent
) {
  try {
    const query = `INSERT INTO chapters (mangaID, chapterNumber, chapterTitle, chapterContent) VALUES (?, ?, ?, ?)`;

    const values = [mangaID, chapterNumber, chapterTitle, chapterContent];

    await db.query(query, values);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.error(`Chapter "${chapterNumber}" already exists.`);
    } else {
      console.error(`Failed to create chapter:`, error);
    }
  }
}

/**
 *
 * Finds the chapter for the specified manga and removes it.
 *
 * Example Usage.
 *
 * await deleteChapter(2, 16);
 *
 * @param {int} mangaID The manga's unique identifier.
 * @param {int} chapterNumber The chapter's number.
 */
export async function deleteChapter(mangaID, chapterNumber) {
  try {
    await db.query(
      `DELETE FROM chapters WHERE mangaID = ? AND chapterNumber = ?`,
      [mangaID, chapterNumber]
    );
  } catch (error) {
    console.error(`Failed to delete chapter:`, error);
  }
}

/**
 *
 * Changes the chapter's title and content.
 *
 * Example Usage.
 *
 * await updateChapter(2, 2, "Fleeting Happiness", "image.png");
 *
 * @param {int} mangaID The manga's unique identifier.
 * @param {int} chapterNumber The chapter's number.
 * @param {string} chapterTitle The chapter's title.
 * @param {string} chapterContent The chapter's content.
 */
export async function updateChapter(
  mangaID,
  chapterNumber,
  chapterTitle,
  chapterContent
) {
  try {
    await db.query(
      `UPDATE chapters SET chapterTitle = ?, chapterContent = ? WHERE mangaID = ? AND chapterNumber = ?`,
      [chapterTitle, chapterContent, mangaID, chapterNumber]
    );
  } catch (error) {
    console.error(`Failed to update chapter:`, error);
  }
}

//////////
//Genres//
//////////

/**
 *
 * Creates a new genre if it doesn't exist already.
 *
 * Example Usage.
 *
 * await createGenre("Fantasy");
 *
 * @param {string} genre The new genre to create.
 */
export async function createGenre(genre) {
  try {
    await db.query(`INSERT INTO genres (genreTag) VALUES (?)`, [genre]);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.error(`"${genre}" genre already exists.`);
    } else {
      console.error(`Failed adding genre:`, error);
    }
  }
}

/**
 *
 * Removes the genre from the specified manga.
 *
 * Example Usage.
 *
 * await removeGenre(2,1);
 *
 * @param {int} mangaID The manga's unique identifier.
 * @param {int} genreID The genre's unique identifier.
 */
export async function removeGenre(mangaID, genreID) {
  try {
    await db.query(
      `DELETE FROM manga_genres WHERE mangaID = ? AND genreID = ?`,
      [mangaID, genreID]
    );
  } catch (error) {
    console.error(`Failed to delete genre:`, error);
  }
}

/**
 *
 * Finds and returns the name of the genre.
 *
 * Example Usage.
 *
 * await getGenreName(1);
 *
 * @param {int} genreID The genre's unique identifier.
 * @returns The name of the genre.
 */
export async function getGenreName(genreID) {
  try {
    return (
      await db.query(`SELECT genreTag FROM genres WHERE genreID = ?`, [genreID])
    )[0][0].genreTag;
  } catch (error) {
    console.error(`Failed to fetch tag:`, error);
  }
}

/**
 *
 * Takes both the Manga's and Genre's ID and adds them
 * to a many-to-many relationship table.
 *
 * Example Usage.
 *
 * await addGenre(1, 2);
 *
 * @param {int} mangaID The manga's unique identifier.
 * @param {int} genreID The genre's unique identifier.
 */
export async function addGenre(mangaID, genreID) {
  try {
    await db.query(
      `INSERT INTO manga_genres (mangaID, genreID) VALUES (?, ?)`,
      [mangaID, genreID]
    );
  } catch (error) {
    console.error(`Failed to add genre:`, error);
  }
}

/**
 *
 * Finds all genres related with the manga
 * and returns an array of their names.
 *
 * Example Usage.
 *
 * await getGenres(1);
 *
 * @param {*} mangaID The manga's unique identifier.
 * @returns A list of genre names.
 */
export async function getGenres(mangaID) {
  try {
    const genreIDs = (
      await db.query(`SELECT * FROM manga_genres WHERE mangaID = ?`, [mangaID])
    )[0];
    const result = [];
    for (const genre of genreIDs) {
      result.push(await getGenreName(genre.genreID));
    }
    return result;
  } catch (error) {
    console.error(`Failed to get genres:`, error);
  }
}
