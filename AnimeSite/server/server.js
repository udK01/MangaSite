import express from "express";
import * as databaseFunctions from "./database.js";

const PORT = 8080;
const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal server error. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
