import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 
import { format } from 'mysql2';

const wasteCollectionRouter = express.Router();

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


export default wasteCollectionRouter;
