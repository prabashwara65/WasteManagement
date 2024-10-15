import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 

const userRouter = express.Router();

userRouter.get("/collections/:id", async (req, res) => {
  try {
    // Ensure the user is authenticated and the user ID is available in req.user
    const userId = req.params.id;  // Assuming the user ID is attached to the request object after authentication
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Establish a connection to the database
    const db = await connectToDatabase();

    // Query to fetch the required fields from the wasteCollection table for the logged-in user
    const [rows] = await db.query(
      `SELECT id, type, binId, date, time 
       FROM wasteCollection
       WHERE collected_from = ?`,
      [userId] // Safely pass the user ID using parameterized query to prevent SQL injection
    );

    // Send the result back as a JSON response
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error executing query", err);
    return res.status(500).json("Error executing query");
  }
});


// // Pass data to the database
// router.post('/create', async (req, res) => {
//     const db = await connectToDatabase(); // Establish the database connection
//     const sql = "INSERT INTO admins (`username`, `email`, `department`) VALUES (?, ?, ?)";
    
//     const values = [
//         req.body.username,
//         req.body.email,
//         req.body.department
//     ];
    
//     try {
//         const [result] = await db.query(sql, values); // Execute the query with the values
//         return res.status(201).json({ message: "Admin created successfully", data: result }); // Respond with a success message
//     } catch (err) {
//         console.error("Error inserting data", err);
//         return res.status(500).json("Error inserting data"); // Handle error
//     }
// });

// // Update data in database
// router.put('/update/:id', async (req, res) => {
//     const db = await connectToDatabase(); 
//     const sql = "UPDATE admins SET `username` = ?, `email` = ?, `department` = ? WHERE id = ?";
//     const values = [
//         req.body.username,
//         req.body.email,
//         req.body.department,
//         req.params.id // Add the ID to the values array
//     ];

//     try {
//         const [result] = await db.query(sql, values); // Execute the update query with the values
//         return res.status(200).json({ message: "Admin updated successfully", data: result }); // Respond with a success message
//     } catch (err) {
//         console.error("Error updating data", err);
//         return res.status(500).json("Error updating data"); // Handle error
//     }
// });

// // Delete data from database
// router.delete('/delete/:id', async (req, res) => {
//     const db = await connectToDatabase(); 
//     const sql = "DELETE FROM admins WHERE id = ?";
//     const id = req.params.id; 

//     try {
//         const [result] = await db.query(sql, [id]); 
//         if (result.affectedRows > 0) {
//             return res.status(200).json({ message: "Admin deleted successfully" }); 
//         } else {
//             return res.status(404).json({ message: "Admin not found" }); 
//         }
//     } catch (err) {
//         console.error("Error deleting data", err);
//         return res.status(500).json("Error deleting data"); 
//     }
// });

export default userRouter;
