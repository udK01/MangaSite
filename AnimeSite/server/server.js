import express from "express";
import multer from "multer";
import fs, { stat } from "fs";
import * as databaseFunctions from "./database.js";

const PORT = 8080;
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/thumbnails/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.json());

/**
 * Retrieve comics.
 */
app.get("/api/mangas", async (req, res) => {
  try {
    const mangas = await databaseFunctions.getMangas();
    for (const manga of mangas) {
      manga.genres = await databaseFunctions.getGenres(manga.mangaID);
      manga.chapters = await databaseFunctions.getChapters(manga.mangaID);
    }
    res.status(200).json(mangas);
  } catch (error) {
    console.error(`Couldn't send comics:`, error);
    res.status(500).json({ error: "Error fetching mangas." });
  }
});

/**
 * Create new comics.
 */
app.post("/api/createComic", upload.single("mangaImage"), async (req, res) => {
  try {
    const {
      mangaTitle,
      imagePath,
      type,
      description,
      author,
      status,
      artist,
      postedBy,
      postedOn,
      released,
      serialisation,
      genres,
    } = req.body;

    await databaseFunctions.createManga(
      mangaTitle,
      imagePath,
      type,
      description,
      author,
      status,
      artist,
      postedBy,
      postedOn,
      released,
      serialisation
    );

    const mangaID = await databaseFunctions.getMangaID(mangaTitle);

    for (const genre of genres.split(",")) {
      const genreID = await databaseFunctions.getGenreID(genre);
      await databaseFunctions.addGenre(mangaID, genreID[0].genreID);
    }

    res.status(200).json(`Comic created successfully!`);
  } catch (error) {
    console.error(`Couldn't create comic:`, error);
    res.status(500).json({ error: "Error creating comic." });
  }
});

/**
 * Retrieve users.
 */
app.get("/api/users", async (req, res) => {
  try {
    const users = await databaseFunctions.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(`Couldn't fetch users:`, error);
    res.status(500).json({ error: "Error fetching users." });
  }
});

app.post("/api/createUser", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    databaseFunctions.createUser(username, password, 0);
    res.status(200).send(`Success`);
  } catch (error) {
    console.error(`Failed to create user:`, error);
    res.status(500).send(`Error`);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (databaseFunctions.userExists(username, password)) {
      const userData = await databaseFunctions.getUser(username);
      userData[0].bookmarks = await databaseFunctions.getBookmarks(
        userData[0].userID
      );
      res.status(200).json(userData);
    } else {
      res.status(200).send(`2`);
    }
  } catch (error) {
    console.error(`Failed to create user:`, error);
    res.status(500).send(`Error`);
  }
});

app.post("/api/createChapter", async (req, res) => {
  try {
    const mangaID = req.body.mangaID;
    const chapterTitle = req.body.chapterTitle;
    const chapterContent = req.body.chapterContent;
    const uploadDate = req.body.uploadDate;

    const chapters = await databaseFunctions.getChapters(mangaID);
    const chapterNumber = chapters.length + 1 || 1;

    await databaseFunctions.createChapter(
      mangaID,
      chapterNumber,
      chapterTitle,
      chapterContent,
      uploadDate
    );
    res.status(200).send("success");
  } catch (error) {
    console.error(`Failed to create chapter:`, error);
    res.status(500).json({ error: `Failed to create chapter!` });
  }
});

app.delete("/api/deleteChapter", async (req, res) => {
  try {
    const chapterID = req.body.chapterID;
    await databaseFunctions.deleteChapter(chapterID);
    res.status(200).send(`success`);
  } catch (error) {
    console.error(`Failed to delete chapter:`, error);
    res.status(500).send(`error`);
  }
});

app.get("/api/getGenres", async (req, res) => {
  try {
    const result = await databaseFunctions.getAllGenres();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error fetching genres.` });
  }
});

app.put("/api/:id", async (req, res) => {
  const mangaID = req.params.id;

  const {
    mangaTitle,
    mangaImage,
    description,
    released,
    author,
    artist,
    rating,
    serialisation,
    postedBy,
    status,
    type,
    addGenres,
    removeGenres,
  } = req.body;

  try {
    await databaseFunctions.updateManga(
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
    );

    // Add Genres.
    for (const genres of addGenres) {
      const genreID = await databaseFunctions.getGenreID(genres);
      await databaseFunctions.addGenre(mangaID, genreID[0].genreID);
    }

    // Remove Genres.
    for (const genres of removeGenres) {
      const genreID = await databaseFunctions.getGenreID(genres);
      await databaseFunctions.removeGenre(mangaID, genreID[0].genreID);
    }

    const updatedManga = await databaseFunctions.getManga(mangaID);

    res.status(200).json(updatedManga[0]);
  } catch (error) {
    console.error("Failed to update manga:", error);
    res.status(500).send("Failed to update manga");
  }
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    // Delete the previous file if it exists
    const previousFile = req.body.previousFileName;
    const fileLocation = `../public/${previousFile.slice(6)}`;
    if (fs.existsSync(fileLocation)) {
      fs.unlinkSync(fileLocation);
    }

    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.error("Failed to upload file:", error);
    res.status(500).send("Failed to upload file.");
  }
});

app.post("/api/createTag", async (req, res) => {
  try {
    const genre = req.body.genre;
    const exists = await databaseFunctions.getGenreID(genre);
    if (exists.length === 0) {
      await databaseFunctions.createGenre(genre);
      res.status(200).send("success");
    } else {
      res.status(200).send("error");
    }
  } catch (error) {
    console.error(`Failed to add tag:`, error);
    res.status(500).send("Failed to add tag.");
  }
});

app.post("/api/deleteTag", async (req, res) => {
  try {
    const genre = req.body.genre;
    await databaseFunctions.deleteGenre(genre);
    res.status(200).send("success");
  } catch (error) {
    console.error(`Failed to remove tag:`, error);
    res.status(500).send("Failed to remove tag.");
  }
});

app.get("/api/bookmark", async (req, res) => {
  try {
    const mangaID = req.query.mangaID;
    const bookmarkCount = await databaseFunctions.getBookmarkCount(mangaID);
    res.status(200).json({ count: bookmarkCount });
  } catch (error) {
    console.error(`Failed to fetch bookmarks:`, error);
    res.status(500).send(`error`);
  }
});

app.post("/api/bookmark", async (req, res) => {
  try {
    const userID = req.body.userID;
    const mangaID = req.body.mangaID;
    const action = req.body.action;

    await databaseFunctions.alterBookmarks(userID, mangaID, action);
    res.status(200).send("Bookmark successfully altered!");
  } catch (error) {
    console.error(`Failed to alter bookmark:`, error);
    res.status(500).send("Failed to alter bookmark.");
  }
});

app.get("/api/rating", async (req, res) => {
  try {
    const userID = req.query.userID;
    const mangaID = req.query.mangaID;
    const rating = await databaseFunctions.getUserRating(userID, mangaID);
    if (rating.length > 0) {
      res.status(200).json(rating);
    }
  } catch (error) {
    console.error(`Failed to fetch rating:`, error);
    res.status(500).send(`Failed to fetch rating`);
  }
});

app.post("/api/rating", async (req, res) => {
  try {
    const userID = req.body.userID;
    const mangaID = req.body.mangaID;
    const rating = req.body.rating;

    await databaseFunctions.setRating(userID, mangaID, rating);
    res.status(200).send(`success`);
  } catch (error) {
    console.error(`Failed to save rating:`, error);
    res.status(500).send(`Failed to save rating`);
  }
});

app.post("/api/deleteManga", async (req, res) => {
  try {
    const mangaID = req.body.mangaID;

    await databaseFunctions.deleteManga(mangaID);

    res.status(200).send(`Deleted successfully!`);
  } catch (error) {
    console.error(`Failed to delete manga:`, error);
    res.status(500).send(`Failed to delete manga`);
  }
});

app.get("/api/relatedSeries", async (req, res) => {
  try {
    const genres = req.query.genres;
    const mangas = await databaseFunctions.findRelatesSeries(genres);
    res.status(200).json(mangas);
  } catch (error) {
    console.err(`Failed to get related series:`, error);
    res.status(500).send(`Failed to get related series.`);
  }
});

app.post("/api/postComment", async (req, res) => {
  try {
    const userID = req.body.userID;
    const mangaID = req.body.mangaID;
    const chapterID = req.body.chapterID;
    const content = req.body.content;

    await databaseFunctions.createComment(userID, mangaID, content, chapterID);
    res.status(200).send(`success`);
  } catch (error) {
    console.error(`Failed to post comment:`, error);
    res.status(500).send(`Failed to post comment.`);
  }
});

app.post("/api/postReply", async (req, res) => {
  try {
    const userID = req.body.userID;
    const mangaID = req.body.mangaID;
    const chapterID = req.body.chapterID;
    const content = req.body.content;
    const parent = req.body.parent;

    await databaseFunctions.createComment(
      userID,
      mangaID,
      content,
      chapterID,
      parent
    );
    res.status(200).send(`success`);
  } catch (error) {
    console.error(`Failed to post comment:`, error);
    res.status(500).send(`Failed to post comment.`);
  }
});

app.get("/api/getComments", async (req, res) => {
  try {
    const userID = req.query.userID;
    const mangaID = req.query.mangaID;
    const chapterID = req.query.chapterID ?? null;

    const comments = await databaseFunctions.getComments(mangaID, chapterID);

    const updatedComments = [];

    for (const comment of comments) {
      const reaction = await databaseFunctions.getReaction(
        userID,
        comment.commentID
      );
      comment.reaction = reaction ?? "abstain";
      comment.likes = await databaseFunctions.countReactions(
        comment.commentID,
        "like"
      );
      comment.dislikes = await databaseFunctions.countReactions(
        comment.commentID,
        "dislike"
      );
      updatedComments.push(comment);
    }

    // Create a map to store comments by their IDs for easy retrieval
    const commentsMap = new Map();
    updatedComments.forEach((comment) => {
      commentsMap.set(comment.commentID, comment);
      // Initialize replies field for each comment
      comment.replies = [];
    });

    // Iterate through comments to add replies
    updatedComments.forEach((comment) => {
      if (comment.parent) {
        const parentComment = commentsMap.get(comment.parent);
        if (parentComment) {
          parentComment.replies.push(comment);
        } else {
          console.error(
            `Parent comment not found for commentID: ${comment.commentID}`
          );
        }
      }
    });

    const topLevelComments = updatedComments.filter(
      (comment) => !comment.parent
    );

    res.status(200).json(topLevelComments);
  } catch (error) {
    console.error(`Failed to fetch comments:`, error);
    res.status(500).send(`Failed to fetch comments.`);
  }
});

app.delete("/api/deleteComment/:id", async (req, res) => {
  try {
    const commentID = req.params.id;
    databaseFunctions.deleteComment(commentID);
    res.status(200).send(`success`);
  } catch (error) {
    console.error(`Failed to delete comment:`, error);
    res.status(500).send(`error`);
  }
});

app.post("/api/editComment", async (req, res) => {
  try {
    const commentID = req.body.commentID;
    const content = req.body.content;
    databaseFunctions.editComment(commentID, content);
    res.status(200).send(`success`);
  } catch (error) {
    console.error(`Failed to delete comment:`, error);
    res.status(500).send(`error`);
  }
});

app.post("/api/setReaction", async (req, res) => {
  try {
    const userID = req.body.userID;
    const commentID = req.body.commentID;
    const reaction = req.body.reaction;
    await databaseFunctions.reactToComment(userID, commentID, reaction);
    res.status(200).send(`success`);
  } catch (error) {
    console.error(`Failed to react to comment:`, error);
    res.status(500).send(`error`);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal server error. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
