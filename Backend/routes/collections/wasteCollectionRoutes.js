import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 
import { format } from 'mysql2';

const wasteCollectionRouter = express.Router();

wasteCollectionRouter.post('/wasteCollection/create', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "INSERT INTO wastecollection (type, weight, collected_by, time, date, city, collected_from, binId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    const values = [
        req.body.type,            // 'plastic', 'food', 'polythene', or 'e waste'
        req.body.weight,          // Weight of the waste collected (e.g., 12.5)
        req.body.collected_by,    // ID of the collector (must exist in collectors table)
        req.body.time,            // Time of the collection (e.g., '14:30:00')
        req.body.date,            // Date of the collection (e.g., '2024-10-15')
        req.body.city,            // City where the collection occurred
        req.body.collected_from,  // ID of the user from whom the waste was collected (must exist in users table)
        req.body.binid            // ID of the bin (must exist in bins table)
    ];
    
    try {
        const [result] = await db.query(sql, values); // Execute the query with the provided values
        return res.status(201).json({ message: "Waste collection record created successfully", data: result });
    } catch (err) {
        console.error("Error inserting data", err);
        return res.status(500).json("Error inserting data");
    }
});

// get all waste collection custome
wasteCollectionRouter.get('/getAllWasteCollectionCustome', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select w.*, c.name as collected_by, u.username as collected_from, w.date from wastecollection w, users u, collectors c where w.collected_from = u.id and w.collected_by = c.id"; // SQL query to get all bins

    

    try {
        const [rows] = await db.query(sql); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



// get all waste collection
wasteCollectionRouter.get('/getAllWasteCollection', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select * from wastecollection"; // SQL query to get all bins

    

    try {
        const [rows] = await db.query(sql); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count all waste
wasteCollectionRouter.get('/countAll', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection"; // SQL query to get all bins

    try {
        const [rows] = await db.query(sql); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count plastic
wasteCollectionRouter.get('/countAllPlastics', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection where type='plastic'"; // SQL query to get all bins

    try {
        const [rows] = await db.query(sql); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count food
wasteCollectionRouter.get('/countAllFood', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection where type='food'"; // SQL query to get all bins

    try {
        const [rows] = await db.query(sql); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count paper
wasteCollectionRouter.get('/countAllPolythene', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection where type='polythene'"; // SQL query to get all bins

    try {
        const [rows] = await db.query(sql); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count ewaste
wasteCollectionRouter.get('/countAllEWaste', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection where type='E-Waste'"; // SQL query to get all bins

    try {
        const [rows] = await db.query(sql); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count paper for one user
wasteCollectionRouter.get('/countAllPaperOneUser/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select sum(w.weight) as weight from wastecollection w, users u where w.collected_from = u.id and w.type='Paper' and u.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count food for one user
wasteCollectionRouter.get('/countAllFoodOneUser/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select sum(w.weight) as weight from wastecollection w, users u where w.collected_from = u.id and w.type='Food' and u.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count paper for one user
wasteCollectionRouter.get('/countAllPolytheneOneUser/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select sum(w.weight) as weight from wastecollection w, users u where w.collected_from = u.id and w.type='Polythene' and u.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count ewaste for one user
wasteCollectionRouter.get('/countAllEWasteOneUser/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select sum(w.weight) as weight from wastecollection w, users u where w.collected_from = u.id and w.type='E-Waste' and u.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});




//count all waste for one collector
wasteCollectionRouter.get('/countAllOneCollector/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, collectors c where w.collected_by = c.id and c.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count plastic for one collector
wasteCollectionRouter.get('/countAllPlasticsOneCollector/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, collectors c where w.collected_by = c.id and w.type='plastic' and c.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count food for one collector
wasteCollectionRouter.get('/countAllFoodOneCollector/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, collectors c where w.collected_by = c.id and w.type='food' and c.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count paper for one collector
wasteCollectionRouter.get('/countAllPolytheneOneCollector/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, collectors c where w.collected_by = c.id and w.type='polythene' and c.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



//count ewaste for one collector
wasteCollectionRouter.get('/countAllEWasteOneCollector/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, collectors c where w.collected_by = c.id and w.type='E-Waste' and c.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});

wasteCollectionRouter.get('/collector/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, collectors c where w.collected_by = c.id and w.type='E-Waste' and c.id = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json({ message: "wasteData retrieved successfully", data: rows }); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});


// select data for one collector
wasteCollectionRouter.get('/collectorCollectedData/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select w.type, w.weight, w.date, w.city, u.username from wastecollection w, users u, collectors c where w.collected_by = c.id and w.collected_from = u.id and collected_by = ?"; // SQL query to get all bins
    const id = req.params.id; // Get the bin ID from request parameters

    try {
        const [rows] = await db.query(sql, [id]); // Execute the query to fetch all bins
        return res.status(200).json(rows); // Respond with the retrieved data
    } catch (err) {
        console.error("Error fetching bins", err);
        return res.status(500).json("Error fetching wasteData"); // Handle error
    }
});



export default wasteCollectionRouter;
