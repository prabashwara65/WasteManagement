import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 

const router = express.Router();

// View user details
router.get("/user", async (req, res) => {
  try {
    const db = await connectToDatabase(); 
    const [rows] = await db.query("SELECT * FROM users"); 
    return res.status(200).json(rows); 
  } catch (err) {
    console.error("Error executing query", err);
    return res.status(500).json("Error executing query"); 
  }
});


// Update data in database
router.put('/update/:id', async (req, res) => {
    const db = await connectToDatabase(); 
    const sql = "UPDATE users SET `username` = ?, `email` = ? , `address_no` = ? , `address_street` = ? , `address_city` = ?,`nic` = ?, `phone` = ? WHERE id = ?";
    const values = [
        req.body.username,
        req.body.email,
        req.body.address_no,
        req.body.address_street,
        req.body.address_city,
        req.body.nic,
        req.body.phone,
        req.params.id // Add the ID to the values array
    ];

    try {
        const [result] = await db.query(sql, values); // Execute the update query with the values
        return res.status(200).json({ message: "User updated successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error updating data", err);
        return res.status(500).json("Error updating data"); // Handle error
    }
});


// Delete data from database
router.delete('/delete/:id', async (req, res) => {
    const db = await connectToDatabase(); 
    const sql = "DELETE FROM users WHERE id = ?";
    const id = req.params.id; 

    try {
        const [result] = await db.query(sql, [id]); 
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "User deleted successfully" }); 
        } else {
            return res.status(404).json({ message: "User not found" }); 
        }
    } catch (err) {
        console.error("Error deleting data", err);
        return res.status(500).json("Error deleting data"); 
    }
});

export default router;
