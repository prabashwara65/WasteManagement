import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 

const router = express.Router();

// View admin details
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

// Pass data to the database
router.post('/create', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "INSERT INTO collectors (`name`, `email`, `area`) VALUES (?, ?, ?)";
    
    const values = [
        req.body.name,
        req.body.email,
        req.body.area
    ];
    
    try {
        const [result] = await db.query(sql, values); // Execute the query with the values
        return res.status(201).json({ message: "collector created successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error inserting data", err);
        return res.status(500).json("Error inserting data"); // Handle error
    }
});

// Update data in database
router.put('/update/:id', async (req, res) => {
    const db = await connectToDatabase(); 
    const sql = "UPDATE collectors SET `name` = ?, `email` = ?, `area` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.area,
        req.params.id // Add the ID to the values array
    ];

    try {
        const [result] = await db.query(sql, values); // Execute the update query with the values
        return res.status(200).json({ message: "collector updated successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error updating data", err);
        return res.status(500).json("Error updating data"); // Handle error
    }
});


// View specific admin details
router.get("/collector/:id", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const [rows] = await db.query("SELECT * FROM collectors WHERE id = ?", [req.params.id]);
      if (rows.length > 0) {
        return res.status(200).json(rows[0]); // Return only the first matching admin
      } else {
        return res.status(404).json({ message: "collector not found" });
      }
    } catch (err) {
      console.error("Error executing query", err);
      return res.status(500).json("Error executing query");
    }
  });
  

// Delete data from database
router.delete('/delete/:id', async (req, res) => {
    const db = await connectToDatabase(); 
    const sql = "DELETE FROM admins WHERE id = ?";
    const id = req.params.id; 

    try {
        const [result] = await db.query(sql, [id]); 
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Admin deleted successfully" }); 
        } else {
            return res.status(404).json({ message: "Admin not found" }); 
        }
    } catch (err) {
        console.error("Error deleting data", err);
        return res.status(500).json("Error deleting data"); 
    }
});

export default router;
