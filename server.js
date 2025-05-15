
const express = require("express"); // web server framework
const cors = require("cors"); // enables cross-origin requests 
const bodyParser = require("body-parser"); // JSON requests 
require("dotenv").config(); // loads environment variables from .env file


const app = express();
const PORT = process.env.PORT || 3000; // use env PORT or defailt to 3000

// middleware setup
app.use(cors()); // allow requests from any origin 
app.use(bodyParser.json()); // parse JSON requests 
app.use(express.static("public")); // files from 'public' folder

// api routes 
app.get("/api/quotes", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    res.json(data[0]); // send back the first quote in array
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote." });
  }
});

// fetch random piece of advice
app.get("/api/advice", async (req, res) => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    res.json(data.slip);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch advice." });
  }
});

// journal data (temporary storage)
let journalEntries = [];

// post new journal entry
app.post("/api/entry", (req, res) => {
  const { mood, text } = req.body;
  const entry = {
    date: new Date().toLocaleDateString(),
    mood,
    text
  };
  journalEntries.push(entry); // save entry to memory 
  res.json({ message: "Entry saved.", entry });
});

// get all saved jounral entries 
app.get("/api/entries", (req, res) => {
  res.json(journalEntries);
});

// path for home page
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// start server 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
