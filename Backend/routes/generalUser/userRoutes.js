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

// Update user details by ID
userRouter.put('/update/:id', async (req, res) => {
  const db = await connectToDatabase(); 
  
  // SQL Query to update user details
  const sql = "UPDATE users SET username = ?, email = ?, nic = ?, address_no = ?, address_street = ?, address_city = ?, phone = ? WHERE id = ?";
  const values = [
      req.body.username,     // User's name
      req.body.email,        // User's email
      req.body.nic,          // User's NIC
      req.body.address_no,   // User's address no
      req.body.address_street, // User's street
      req.body.address_city, // User's city
      req.body.phone,        // User's phone
      req.params.id          // ID to identify which user to update
  ];

  try {
      const [result] = await db.query(sql, values); // Execute the SQL query with values
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" }); // If no user found, return a 404
      }
      return res.status(200).json({ message: "User updated successfully", data: result }); // Success message
  } catch (err) {
      console.error("Error updating user data", err);
      return res.status(500).json({ error: "Error updating user data" }); // Handle any server errors
  }
});


userRouter.get("/user/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
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

// Schedule Pickup Endpoint
userRouter.post('/schedulePickup', async (req, res) => {
  const db = await connectToDatabase(); // Establish the database connection
  const sql = "INSERT INTO schedule_pickup (user_id, name, waste_type, pickup_date, pickup_time) VALUES (?, ?, ?, ?, ?)";
  
  const values = [
      req.body.user_id,   // User ID from the request body
      req.body.name,      // Name from the request body
      req.body.wasteType, // Waste type from the request body
      req.body.date,      // Date from the request body
      req.body.time       // Time from the request body
  ];
  
  try {
      const [result] = await db.query(sql, values); // Execute the query with the values
      return res.status(201).json({ message: "Pickup scheduled successfully", data: result }); // Respond with a success message
  } catch (err) {
      console.error("Error inserting data", err);
      return res.status(500).json({ error: "Error inserting data" }); // Handle error
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
