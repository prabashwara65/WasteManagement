import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 

const router = express.Router();

// View CityAssign details
router.get("/ViewCityAssigns", async (req, res) => {
  try {
    const db = await connectToDatabase(); 
    const [rows] = await db.query("SELECT * FROM city"); 
    return res.status(200).json(rows); 
  } catch (err) {
    console.error("Error executing query", err);
    return res.status(500).json("Error executing query"); 
  }
});

// Pass data to the database
router.post('/create', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "INSERT INTO city (`Colombo`, `Kandy`, `Galle` , `Jaffna`) VALUES (?, ?, ?,?)";
    
    const values = [
        req.body.colombo,
        req.body.kandy,
        req.body.galle,
        req.body.jaffna,
    ];
    
    try {
        const [result] = await db.query(sql, values); // Execute the query with the values
        return res.status(201).json({ message: "City was Assigned successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error inserting data", err);
        return res.status(500).json("Error inserting data"); // Handle error
    }
});

// Update data in database
router.put('/update/:id', async (req, res) => {
    const db = await connectToDatabase(); 
    const sql = "UPDATE admins SET `Colombo` = ?, `Kandy` = ?, `Galle` = ? , `Jaffna` = ? WHERE id = ?";
    const values = [
        req.body.colombo,
        req.body.kandy,
        req.body.galle,
        req.body.jaffna,
    ];

    try {
        const [result] = await db.query(sql, values); // Execute the update query with the values
        return res.status(200).json({ message: "City was updated successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error updating data", err);
        return res.status(500).json("Error updating data"); // Handle error
    }
});

// View specific admin details
router.get("/CityAssigns/:id", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const [rows] = await db.query("SELECT * FROM city WHERE id = ?", [req.params.id]);
      if (rows.length > 0) {
        return res.status(200).json(rows[0]); // Return only the first matching admin
      } else {
        return res.status(404).json({ message: "City Assigned  not found" });
      }
    } catch (err) {
      console.error("Error executing query", err);
      return res.status(500).json("Error executing query");
    }
  });

// Delete data from database
router.delete('/delete/:id', async (req, res) => {
    const db = await connectToDatabase(); 
    const sql = "DELETE FROM city WHERE id = ?";
    const id = req.params.id; 

    try {
        const [result] = await db.query(sql, [id]); 
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "ACity Assigned successfully" }); 
        } else {
            return res.status(404).json({ message: "City Assigned not found" }); 
        }
    } catch (err) {
        console.error("Error deleting data", err);
        return res.status(500).json("Error deleting data"); 
    }
});

export default router;
