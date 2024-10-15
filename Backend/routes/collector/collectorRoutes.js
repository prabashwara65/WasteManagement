import express from 'express';
import { connectToDatabase } from '../../lib/db.js';

const router = express.Router();

// View all collectors' details
router.get("/collector", async (req, res) => {
  try {
    const db = await connectToDatabase(); 
    const [rows] = await db.query("SELECT * FROM collectors"); 
    return res.status(200).json(rows); 
  } catch (err) {
    console.error("Error executing query", err);
    return res.status(500).json("Error executing query"); 
  }
});

// Create a new collector
router.post('/create', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "INSERT INTO collectors (`name`, `email`, `city`, `address`, `phone`, `salary` , `password`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    const values = [
        req.body.name,
        req.body.email,
        req.body.city,
        req.body.address,
        req.body.phone,
        req.body.salary,
        req.body.password
    ];
    
    try {
        const [result] = await db.query(sql, values); // Execute the query with the values
        return res.status(201).json({ message: "Collector created successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error inserting data", err);
        return res.status(500).json("Error inserting data"); // Handle error
    }
});

// Update collector data
router.put('/update/:id', async (req, res) => {
    const db = await connectToDatabase(); 
    const sql = "UPDATE collectors SET `name` = ?, `email` = ?, `city` = ?, `address` = ?, `phone` = ?, `salary` = ? , `password`= ?  WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.city,
        req.body.address,
        req.body.phone,
        req.body.salary,
        req.body.password,
        req.params.id // Add the ID to the values array
    ];

    try {
        const [result] = await db.query(sql, values); // Execute the update query with the values
        return res.status(200).json({ message: "Collector updated successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error updating data", err);
        return res.status(500).json("Error updating data"); // Handle error
    }
});

// View specific collector details
router.get("/collector/:id", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const [rows] = await db.query("SELECT * FROM collectors WHERE id = ?", [req.params.id]);
      if (rows.length > 0) {
        return res.status(200).json(rows[0]); // Return only the first matching collector
      } else {
        return res.status(404).json({ message: "Collector not found" });
      }
    } catch (err) {
      console.error("Error executing query", err);
      return res.status(500).json("Error executing query");
    }
});

// Delete collector data
router.delete('/delete/:id', async (req, res) => {
    const db = await connectToDatabase(); 
    const sql = "DELETE FROM collectors WHERE id = ?"; // Corrected to 'collectors' table
    const id = req.params.id; 

    try {
        const [result] = await db.query(sql, [id]); 
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Collector deleted successfully" }); 
        } else {
            return res.status(404).json({ message: "Collector not found" }); 
        }
    } catch (err) {
        console.error("Error deleting data", err);
        return res.status(500).json("Error deleting data"); 
    }
});




export default router;
