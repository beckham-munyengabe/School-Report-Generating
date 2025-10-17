// server.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your MySQL password
  database: "react", // your database name
});

// connect check
db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// route to insert
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error("❌ MySQL Error:", err);
      return res.status(500).json({ message: "Error inserting user" });
    }
    return res.json({ message: "User inserted successfully!" });
  });
});


// route to fetch a single user by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, username, email, password FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ MySQL Error:", err);
      return res.status(500).json({ message: "Error fetching user" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]);
  });
});

// route to login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT id, username, email, password FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("❌ MySQL Error:", err);
      return res.status(500).json({ message: "Error checking credentials" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    // NOTE: If you store hashed passwords, use bcrypt.compare instead.
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Do not send password back
    delete user.password;
    res.json({ message: "Login successful", user });
  });
});
app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
