import express from "express";
import multer from "multer";
import * as databaseFunctions from "./database.js";
import { FaRegSun } from "react-icons/fa";

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
 * Retrieve users.
 */
app.get("/api/user/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const userData = await databaseFunctions.getUser(username);
    res.status(200).json(userData);
  } catch (error) {
    console.error(`Couldn't fetch users:`, error);
    res.status(500).json({ error: "Error fetching users." });
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
      postedOn
    );

    res.status(200).json(`Comic created successfully!`);
  } catch (error) {
    console.error(`Couldn't create comic:`, error);
    res.status(500).json({ error: "Error creating comic." });
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal server error. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
