import express from "express";
import * as databaseFunctions from "./database.js";

const PORT = 8080;
const app = express();

app.use(express.json());

app.get("/api/mangas", async (req, res) => {
  try {
    const mangas = await databaseFunctions.getMangas();
    for (const manga of mangas) {
      manga.genres = await databaseFunctions.getGenres(manga.mangaID);
    }
    res.status(200).json(mangas);
  } catch (error) {
    console.error(`Couldn't send comics:`, error);
    res.status(500).json({ error: "Error fetching mangas." });
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
