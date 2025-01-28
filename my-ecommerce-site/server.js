import express from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // Ensure you're using the correct mysql2 library

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the frontend
app.use(express.json());

let db; // Declare the database connection variable

// MySQL Connection
(async () => {
  try {
    db = await mysql.createConnection({
      host: "localhost", // or your database host
      user: "root", // your MySQL username
      password: "password", // your MySQL password
      database: "ecommerce", // your MySQL database name
    });
    console.log("Connected to the MySQL database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the app if the database connection fails
  }
})();

// API Route for Products
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows); // Return the products as JSON
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
