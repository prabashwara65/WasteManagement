import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 
import { format } from 'mysql2';

const binRouter = express.Router();

binRouter.get('/getAllBins', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select b.id, b.type, u.username, b.createdAt from bins b, users u where b.assigned_user = u.id"; // SQL query to get all bins

    
    
    try {
        const [rows] = await db.query(sql); // Execute the query to fetch all bins
        return res.status(200).json({ message: "Bins retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching bins"); // Handle error
    }
});


// create bin
binRouter.post('/createBin', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "INSERT INTO Bins (`type`, `assigned_user`) VALUES (?, ?)"; // Adjusted query for Bins table
    
    const values = [
        req.body.type,          // The type of the bin
        req.body.assigned_user  // The assigned user for the bin
    ];
    
    try {
        const [result] = await db.query(sql, values); // Execute the query with the values
        return res.status(201).json({ message: "Bin created successfully", data: result }); // Respond with a success message
    } catch (err) {
        console.error("Error inserting data", err);
        return res.status(500).json("Error inserting data"); // Handle error
    }
});


// // Delete data from database
binRouter.delete('/delete/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "DELETE FROM Bins WHERE id = ?"; // SQL query to delete a bin
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [result] = await db.query(sql, [id]); // Execute the query with the ID
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Bin deleted successfully" }); // Successful deletion
        } else {
            return res.status(404).json({ message: "Bin not found" }); // Bin ID not found
        }
    } catch (err) {
        console.error("Error deleting data", err);
        return res.status(500).json({ message: "Error deleting data" }); // Handle error
    }
});

export default binRouter;
