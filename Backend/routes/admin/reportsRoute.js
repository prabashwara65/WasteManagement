import express from 'express';
import { connectToDatabase } from '../../lib/db.js'; 

const router = express.Router();

//  Predicted Waste Reports
// fetch all Predicted Waste data
router.get("/viewPredicted", async (req, res) => {
    try {
      const db = await connectToDatabase(); 
      const [rows] = await db.query("SELECT * FROM predictedwaste"); 
      return res.status(200).json(rows); 
    } catch (err) {
      console.error("Error executing query", err);
      return res.status(500).json("Error executing query"); 
    }
  });

  //user distribution report 
  router.get("/viewDistribution", async (req, res) => {
    try {
      const db = await connectToDatabase(); 
      const [rows] = await db.query("SELECT * FROM users"); 
      return res.status(200).json(rows); 
    } catch (err) {
      console.error("Error executing query", err);
      return res.status(500).json("Error executing query"); 
    }
  });

  //area and waste collection distribution
  router.get("/viewCollectors", async (req, res) => {
    try {
      const db = await connectToDatabase(); 
      const [rows] = await db.query("SELECT * FROM collectors"); 
      return res.status(200).json(rows); 
    } catch (err) {
      console.error("Error executing query", err);
      return res.status(500).json("Error executing query"); 
    }
  });

export default router;
