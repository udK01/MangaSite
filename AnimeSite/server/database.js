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
    port: process.env.DB_PORT || 3306,
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
    const defaultProfilePicture = "/vite.svg";

    // Sql Query.
    const query = `
      INSERT INTO users (username, password, profilePicture, accessLevel)
      VALUES (?, ?, ?, ?)
    `;

    // Values To Enter.
    const values = [username, password, defaultProfilePicture, accessLevel];

    // Add & Feedback.
    await db.query(query, values);
  } catch (error) {
    // Error Handling For Duplicate Usernames.
    if (error.code === "ER_DUP_ENTRY") {
      return `Username "${username}" already exists.`;
    } else {
      console.error("Failed to create new user:", error);
    }
  }
}

/**
 *
 * Checks the DB for an existing pair with the
 * provided username and password combination, and
 * returns true or false based on its findings.
 *
 * Example Usage.
 *
 * await userExists("udK", "password");
 *
 * @param {string} username The user's username.
 * @param {string} password The user's password.
 * @returns True if it finds a matching username and password, false otherwise.
 */
export async function userExists(username, password) {
  try {
    const exists = (
      await db.query(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password]
      )
    )[0];
    return exists.length > 0;
  } catch (error) {
    console.error(`Failed to find user:`, error);
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
 * Fetches the specified user.
 *
 * Example Usage.
 *
 * await getUser(udK);
 *
 * @returns the specified user.
 *
 */
export async function getUser(username) {
  try {
    return (
      await db.query(`SELECT * FROM users WHERE username = ?`, [username])
    )[0];
  } catch (error) {
    console.error(`Failed to fetch user:`, error);
  }
}

/**
 *
 * Fetches all existing users' information
 * except their password.
 *
 * Example Usage.
 *
 * await getUser();
 *
 * @returns an array of users.
 *
 */
export async function getUsers() {
  try {
    return (
      await db.query(
        `SELECT userID, username, profilePicture, accessLevel, description FROM users`
      )
    )[0];
  } catch (error) {
    console.error(`Failed to fetch users:`, error);
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

/**
 *
 * This method finds the user and alters
 * their description.
 *
 * Example Usage
 *
 * await changeDescription("New Description!", 11);
 *
 * @param {string} description The description shown on the user's profile.
 * @param {int} userID The user's unique identifier.
 */
export async function changeDescription(description, userID) {
  try {
    await db.query(`UPDATE users SET description = ? WHERE userID = ?`, [
      description,
      userID,
    ]);
  } catch (error) {
    console.error(`Failed to alter description:`, error);
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

/**
 *
 * Counts all the user's that have bookmarked a specific manga.
 *
 * Example Usage
 *
 * await getBookmarkCount(17);
 *
 * @param {int} mangaID the manga's unique identifier.
 * @returns the number of bookmarks for the manga.
 */
export async function getBookmarkCount(mangaID) {
  try {
    return (
      await db.query(
        `SELECT COUNT(*) AS count FROM user_bookmarks WHERE mangaID = ?`,
        [mangaID]
      )
    )[0][0].count;
  } catch (error) {
    console.error(`Failed to fetch bookmark count:`, error);
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
 * await createManga(
 *  `Comic 2`,
 *  `Cat or Dogs?`,
 *  `Manga`,
 *  `The sneaky cat, pushed the dull dog...`,
 *  `FoxLover`,
 *  `OnGoing`,
 *  `Unknown`,
 *  `udK`,
 *  `2022-07-10`
 *  `mangaSite.com`
 *  `-`
 * );
 *
 * @param {string} mangaTitle The comic's title.
 * @param {string} mangaImage The comic's image.
 * @param {string} type The comic's type.
 * @param {string} description The comic's description.
 * @param {string} author The comic's author.
 * @param {string} status The comic's status.
 * @param {string} artist The comic's artist.
 * @param {string} postedBy The comic's poster's username.
 * @param {date} postedOn The comic's posting date.
 * @param {string} released The platform the comic released on.
 * @param {string} serialisation The comic's serialisation.
 *
 */
export async function createManga(
  mangaTitle,
  mangaImage,
  type,
  description,
  author,
  status,
  artist,
  postedBy,
  postedOn,
  released,
  serialisation
) {
  try {
    let defaultRating = 0;

    // Sql Query.
    const query = `
      INSERT INTO Mangas (mangaTitle, mangaImage, rating, type, description, author, status, artist, postedBy, postedOn, released, serialisation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      artist,
      postedBy,
      postedOn,
      released,
      serialisation,
    ];

    await db.query(query, values);
  } catch (error) {
    console.error(`Couldn't create comic:`, error);
  }
}

/**
 *
 * Returns all of our stored data with
 * their existing chapter count.
 *
 * Example Usage.
 *
 * await getMangas();
 *
 * @returns Every manga from our database.
 */
export async function getMangas() {
  try {
    const mangas = (await db.query(`SELECT * FROM mangas`))[0];
    for (const manga of mangas) {
      manga.totalChapters = await getTotalChapters(manga.mangaID);
    }
    return mangas;
  } catch (error) {
    console.error(`Failed to fetch mangas:`, error);
  }
}

/**
 *
 * Finds and returns the specified manga,
 * including existing genres and chapters.
 *
 * Example Usage
 *
 * await getManga(2);
 *
 * @param {int} mangaID The manga's unique identifier.
 * @returns the specified manga.
 */
export async function getManga(mangaID) {
  try {
    const manga = (
      await db.query(`SELECT * FROM mangas WHERE mangaID = ?`, [mangaID])
    )[0];
    manga[0].genres = await getGenres(mangaID);
    manga[0].chapters = await getChapters(mangaID);

    return manga;
  } catch (error) {
    console.error(`Failed to fetch manga:`, error);
  }
}

/**
 *
 * Finds the manga in the database, using the unique
 * title, and returns only the manga's ID.
 *
 * @param {string} mangaTitle The manga's title.
 * @returns the manga's ID.
 */
export async function getMangaID(mangaTitle) {
  try {
    const mangaID = (
      await db.query(`SELECT mangaID FROM mangas WHERE mangaTitle = ?`, [
        mangaTitle,
      ])
    )[0];

    return mangaID[0].mangaID;
  } catch (error) {
    console.error(`Failed to fetch manga:`, error);
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
 *  "OnGoing",
 *  "Unknown",
 *  "udK",
 *  "manga-site",
 *  null
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
 * @param {string} artist The comic's artist.
 * @param {string} postedBy The comic's poster.
 * @param {string} released The platform it was released on.
 * @param {string} serialisation The comic's serialisation.
 */
export async function updateManga(
  mangaID,
  mangaTitle,
  mangaImage,
  rating,
  type,
  description,
  author,
  status,
  artist,
  postedBy,
  released,
  serialisation
) {
  try {
    // SQL Query.
    const query = `
  UPDATE Mangas 
  SET mangaTitle = ?, mangaImage = ?, rating = ?, type = ?, description = ?, author = ?, status = ?, artist = ?, postedBy = ?, released = ?, serialisation = ?
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
      artist,
      postedBy,
      released,
      serialisation,
      mangaID,
    ];

    await db.query(query, values);
  } catch (error) {
    console.error(`Failed to update manga:`, error);
  }
}

/**
 *
 * Removes a manga from the table using it's unique ID.
 *
 * Example Usage
 *
 * deleteManga(5);
 *
 * @param {int} mangaID the manga's unique identifier.
 */
export async function deleteManga(mangaID) {
  try {
    await db.query(`DELETE FROM mangas WHERE mangaID = ?`, [mangaID]);
  } catch (error) {
    console.error(`Failed to delete manga:`, error);
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
 * await createChapter(2, 16, "Plated Escort", "The treacherous tale of Sun-Min Woo, The Plates Escort.", "2001-09-28 12:32:52");
 *
 * @param {int} mangaID The manga's unique identifier.
 * @param {int} chapterNumber The chapter's number.
 * @param {string} chapterTitle The chapter's title.
 * @param {string} chapterContent The chapter's content.
 * @param {date} uploadDate The chapter's upload date.
 */
export async function createChapter(
  mangaID,
  chapterNumber,
  chapterTitle,
  chapterContent,
  uploadDate
) {
  try {
    const query = `INSERT INTO chapters (mangaID, chapterNumber, chapterTitle, chapterContent, uploadDate) VALUES (?, ?, ?, ?, ?)`;

    const values = [
      mangaID,
      chapterNumber,
      chapterTitle,
      chapterContent,
      uploadDate,
    ];

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
 * await deleteChapter(115);
 *
 * @param {int} chapterID the chapter's unique identifier.
 *
 */
export async function deleteChapter(chapterID) {
  try {
    await db.query(`DELETE FROM chapters WHERE chapterID = ?`, [chapterID]);
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
 * Returns all chapters related with the specified manga.
 *
 * @param {int} mangaID The manga's unique identifier.
 * @returns All chapter's related to the manga.
 */
export async function getChapters(mangaID) {
  try {
    return (
      await db.query(`SELECT * FROM chapters WHERE mangaID = ?`, [mangaID])
    )[0];
  } catch (error) {
    console.error(`Failed to fetch chapters:`, error);
  }
}

/**
 *
 * Finds and returns the specified chapter for the
 * specified manga.
 *
 * Example Usage
 *
 * await getChapter(17, 2);
 *
 * @param {int} mangaID The manga's unique identifier.
 * @param {int} chapterNumber The chapter's number.
 * @returns the specific chapter.
 */
export async function getChapter(mangaID, chapterNumber) {
  try {
    return (
      await db.query(
        `SELECT * FROM chapters WHERE mangaID = ? && chapterNumber = ?`,
        [mangaID, chapterNumber]
      )
    )[0];
  } catch (error) {
    console.error(`Failed to get chapter:`, error);
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
    let formattedGenre = genre.toLowerCase();
    formattedGenre =
      formattedGenre.charAt(0).toUpperCase() + formattedGenre.slice(1);
    await db.query(`INSERT INTO genres (genreTag) VALUES (?)`, [
      formattedGenre,
    ]);
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
 * Deletes the genre.
 * Changes also cascade into "manga_genres"
 *
 * @param {string} genre The genre's name.
 */
export async function deleteGenre(genre) {
  try {
    await db.query(`DELETE FROM genres WHERE genreTag = ?`, [genre]);
  } catch (error) {
    console.error(`Failed to delete genre:`, error);
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
 * Finds the genre using it's name and returns its ID.
 *
 * Example Usage
 *
 * await getGenreID("Fantasy");
 *
 * @param {string} genreTag The genre's name. E.g. Fatansy
 * @returns The genre's ID.
 */
export async function getGenreID(genreTag) {
  try {
    return (
      await db.query(`SELECT genreID FROM genres WHERE genreTag = ?`, [
        genreTag,
      ])
    )[0];
  } catch (error) {
    console.error(`Failed to get genre tag:`, error);
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
 * @returns Every genre's name.
 */
export async function getAllGenres() {
  try {
    return await db.query(`SELECT genreTag FROM genres ORDER BY genreTag ASC`);
  } catch (error) {
    console.error(`Failed to fetch genres:`, error);
  }
}

/**
 *
 * Takes a list of genres, compares it to the genres
 * other mangas hold, and return a sorted list based on
 * similarity between them.
 *
 * @param {string[]} genres A list of genre's the manga has.
 * @returns A sorted list of all of our mangas based on similarity of genres.
 */
export async function findRelatesSeries(genres) {
  try {
    const allManga = await getMangas();
    const matchCountMap = new Map();

    for (let i = 0; i < allManga.length; i++) {
      const manga = allManga[i];
      manga.genres = await getGenres(manga.mangaID);
      let matchCount = 0;
      for (let j = 0; j < manga.genres.length; j++) {
        const mangaGenreId = manga.genres[j];
        if (genres.includes(mangaGenreId)) {
          matchCount++;
        }
      }
      matchCountMap.set(manga, matchCount);
    }

    const sortedManga = [...matchCountMap.keys()].sort((mangaA, mangaB) => {
      const matchCountA = matchCountMap.get(mangaA);
      const matchCountB = matchCountMap.get(mangaB);
      return matchCountB - matchCountA;
    });

    return sortedManga;
  } catch (error) {
    console.error(`Failed to find related series:`, error);
  }
}

///////////
//Ratings//
///////////

/**
 *
 * Saves the rating given by an user to a specified manga.
 * If the user has already given it a rating, it replaces it
 * with a new value and updates the overall rating.
 *
 * Example Usage
 *
 * await setRating(1, 18, 4.4);
 *
 * @param {int} userID The user's unique identifier.
 * @param {int} mangaID The manga's unique identifier.
 * @param {int} rating The manga's rating.
 */
export async function setRating(userID, mangaID, rating) {
  try {
    await db.query(
      `INSERT INTO ratings (userID, mangaID, rating) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
      [userID, mangaID, rating]
    );
    await changeMangaRating(mangaID);
  } catch (error) {
    console.error(`Failed to set rating:`, error);
  }
}

/**
 *
 * Finds the specified manga for the user and
 * returns the user's rating of it.
 *
 * Example Usage
 *
 * await getRating(1, 18);
 *
 * @param {int} userID The user's unique identifier.
 * @param {int} mangaID The manga's unique identifier.
 * @returns The user's rating of a manga.
 */
export async function getUserRating(userID, mangaID) {
  try {
    return (
      await db.query(`SELECT * FROM ratings WHERE userID = ? && mangaID = ?`, [
        userID,
        mangaID,
      ])
    )[0];
  } catch (error) {
    console.error(`Failed to fetch rating:`, error);
  }
}

/**
 *
 * Deletes an existing rating from the user
 * for a specified manga.
 *
 * Example Usage
 *
 * await deleteRating(1, 18);
 *
 * @param {int} userID The user's unique identifier.
 * @param {int} mangaID The manga's unique identifier.
 */
export async function deleteRating(userID, mangaID) {
  try {
    await db.query(`DELETE FROM ratings WHERE userID = ? && mangaID = ?`, [
      userID,
      mangaID,
    ]);
  } catch (error) {
    console.error(`Failed to delete rating:`, error);
  }
}

/**
 *
 * Finds the average rating for the specified manga
 * and alters the overall rating to match it.
 *
 * Example Usage
 *
 * await changeMangaRating(18);
 *
 * @param {int} mangaID The manga's unique identifier.
 */
async function changeMangaRating(mangaID) {
  try {
    const avgRating = (
      await db.query(
        `SELECT ROUND(AVG(rating), 2) as rating FROM ratings WHERE mangaID = ?`,
        [mangaID]
      )
    )[0][0].rating;

    await db.query(
      `UPDATE mangas SET rating = ${avgRating} WHERE mangaID = ?`,
      [mangaID]
    );
  } catch (error) {
    console.error(`Failed to change manga rating:`, error);
  }
}

////////////
//Comments//
////////////

/**
 *
 * Creates a new comment.
 *
 * Usage Example
 *
 * await createComment(1, 12, "Hello...", 3);
 *
 * The example above automatically nulls "parent".
 * Both chapterID and parent are nullable.
 *
 * @param {int} userID The user's unique identifier.
 * @param {int} mangaID The manga's unique identifier.
 * @param {string} content The comment's content.
 * @param {int} chapterID The chapter's unique identifier.
 * @param {int} parent The comment's parent comment's ID.
 */
export async function createComment(
  userID,
  mangaID,
  content,
  uploadDate,
  chapterID = null,
  parent = null
) {
  try {
    await db.query(
      `INSERT INTO comments (userID, mangaID, chapterID, parent, content, uploadDate) VALUES (?, ?, ?, ?, ?, ?)`,
      [userID, mangaID, chapterID, parent, content, uploadDate]
    );
  } catch (error) {
    console.error(`Failed to create comment:`, error);
  }
}

export async function getComments(mangaID, chapterID = null) {
  try {
    let sql = "SELECT * FROM comments WHERE mangaID = ?";
    let params = [mangaID];

    if (chapterID !== null) {
      sql += " AND chapterID = ?";
      params.push(chapterID);
    }

    return (await db.query(sql, params))[0];
  } catch (error) {
    console.error(`Failed to get comments:`, error);
  }
}

export async function getUserComments(userID) {
  try {
    return (
      await db.query(`SELECT * FROM comments WHERE userID = ?`, [userID])
    )[0];
  } catch (error) {
    console.error(`Failed to get user's comments:`, error);
  }
}

export async function deleteComment(commentID) {
  try {
    await db.query(
      `UPDATE comments SET userID = ?, content = ?, edited = ? WHERE commentID = ?`,
      [0, "This comment has been removed.", 0, commentID]
    );
  } catch (error) {
    console.error(`Failed to delete comment:`, error);
  }
}

export async function editComment(commentID, content) {
  try {
    await db.query(
      `UPDATE comments SET content = ?, edited = ? WHERE commentID = ?`,
      [content, 1, commentID]
    );
  } catch (error) {
    console.error(`Failed to delete comment:`, error);
  }
}

export async function reactToComment(userID, commentID, reaction) {
  try {
    switch (reaction) {
      case "like":
      case "dislike":
      case "abstain":
        await db.query(
          `
          INSERT INTO user_likes_dislikes (userID, commentID, reaction)
          VALUES (?, ?, ?)
          ON DUPLICATE KEY UPDATE reaction = VALUES(reaction)
        `,
          [userID, commentID, reaction]
        );
        break;
      default:
        throw new Error(`Invalid reaction: ${reaction}`);
    }
  } catch (error) {
    console.error(`Failed to react to comment:`, error);
  }
}

export async function getReaction(userID, commentID) {
  try {
    const reaction = (
      await db.query(
        `SELECT reaction FROM user_likes_dislikes WHERE userID = ? AND commentID = ?`,
        [userID, commentID]
      )
    )[0];
    return reaction.length > 0 ? reaction[0].reaction : "";
  } catch (error) {
    console.error(`Failed to get reaction:`, error);
  }
}

export async function countReactions(commentID, reaction) {
  try {
    const count = (
      await db.query(
        `SELECT COUNT(*) as c FROM user_likes_dislikes WHERE commentID = ? AND reaction = ?`,
        [commentID, reaction]
      )
    )[0];
    return count.length > 0 ? count[0].c : 0;
  } catch (error) {
    console.error(`Failed to count reactions:`, error);
  }
}
