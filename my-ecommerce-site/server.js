import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins for simplicity (or specify the frontend domain)
app.use(express.json());

// Serve React build files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist"))); // Ensure your React app is in the "dist" folder

// MySQL Connection
let db;
(async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST, // Use environment variables for production
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Connected to the MySQL database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
})();

// API Route for Products
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
