import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react", // ✅ change to your DB name
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// Signup route
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.status(200).json({ message: "User registered successfully!" });
    }
  });
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
