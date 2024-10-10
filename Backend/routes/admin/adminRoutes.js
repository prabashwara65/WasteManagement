import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 

const router = express.Router();

// View admin details
router.get("/admin", async (req, res) => {
  try {
    const db = await connectToDatabase(); 
    const [rows] = await db.query("SELECT * FROM admins"); 
    return res.status(200).json(rows); 
  } catch (err) {
    console.error("Error executing query", err);
    return res.status(500).json("Error executing query"); 
  }
});

// Pass data to the database
router.post('/create', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "INSERT INTO admins (`username`, `email`, `department`) VALUES (?, ?, ?)";
    
    const values = [
        req.body.username,
        req.body.email,
        req.body.department
    ];
    
    try {
        const [result] = await db.query(sql, values); // Execute the query with the values
        return res.status(201).json({ message: "Admin created successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error inserting data", err);
        return res.status(500).json("Error inserting data"); // Handle error
    }
});

export default router;
