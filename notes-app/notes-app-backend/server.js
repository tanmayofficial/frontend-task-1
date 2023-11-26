const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use(cors());
app.use(bodyParser.json());

app.post("/notes", (req, res) => {
  const { notes_text } = req.body;

  db.query(
    "INSERT INTO notes (notes_text, created_on) VALUES (?, CURRENT_TIMESTAMP(6))",
    [notes_text],
    (err, result) => {
      if (err) {
        console.error("Error adding note to database:", err);
        res.status(500).json({ error: "Error adding note to database" });
      } else {
        const insertedNoteId = result.insertId;

        // Retrieve the inserted note with the correct created_on value
        db.query(
          'SELECT id, notes_text, DATE_FORMAT(created_on, "%Y-%m-%d %H:%i:%s") AS created_on FROM notes WHERE id = ?',
          [insertedNoteId],
          (err, result) => {
            if (err) {
              console.error("Error fetching inserted note from database:", err);
              res
                .status(500)
                .json({ error: "Error fetching inserted note from database" });
            } else {
              const insertedNote = result[0];
              res.json(insertedNote);
            }
          }
        );
      }
    }
  );
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM notes WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting note from database:", err);
      res.status(500).json({ error: "Error deleting note from database" });
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
