import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 
import { format } from 'mysql2';

const wasteCollectionRouter = express.Router();

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
wasteCollectionRouter.get('/countAllPaper', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection where type='paper'"; // SQL query to get all bins

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

//count plastic for one user
wasteCollectionRouter.get('/countAllPlastics/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, users u where w.collected_from = u.id and w.type='plastic' and u.id = ?"; // SQL query to get all bins
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
wasteCollectionRouter.get('/countAllFood/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, users u where w.collected_from = u.id and w.type='food' and u.id = ?"; // SQL query to get all bins
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
wasteCollectionRouter.get('/countAllPaper/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, users u where w.collected_from = u.id and w.type='paper' and u.id = ?"; // SQL query to get all bins
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
wasteCollectionRouter.get('/countAllEWaste/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, users u where w.collected_from = u.id and w.type='E-Waste' and u.id = ?"; // SQL query to get all bins
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
wasteCollectionRouter.get('/countAll/:id', async (req, res) => {
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
wasteCollectionRouter.get('/countAllPlastics/:id', async (req, res) => {
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
wasteCollectionRouter.get('/countAllFood/:id', async (req, res) => {
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
wasteCollectionRouter.get('/countAllPaper/:id', async (req, res) => {
    const db = await connectToDatabase(); // Establish the database connection
    const sql = "select count(*) from wastecollection w, collectors c where w.collected_by = c.id and w.type='paper' and c.id = ?"; // SQL query to get all bins
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
wasteCollectionRouter.get('/countAllEWaste/:id', async (req, res) => {
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




export default wasteCollectionRouter;
