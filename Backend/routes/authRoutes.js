import express, { json } from 'express';
import { connectToDatabase } from '../lib/db.js'; // Fix the function name
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const router = express.Router();

//     username: '',
//     email: '',
//     password: '',
//     address_no: '',
//     address_street: '',
//     address_city: '',
//     nic: '',
//     phone: '',

router.post('/register', async (req, res) => {
    const { username, email, password, address_no, address_street , address_city, nic , phone} = req.body;
    try {
        const db = await connectToDatabase();
        
        // Check if the user already exists
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        //const hashPassword = await bcrypt.hash(password, 10);
        
        // Insert new user into the database
        await db.query('INSERT INTO users (username, email, password , address_no, address_street , address_city, nic , phone) VALUES (?, ?, ?,?, ?, ?,?,?)', 
            [username, email, password , address_no, address_street , address_city, nic , phone]
        );

        // Return success response
        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        // Return internal server error
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        
        // Check if the user already exists
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not exists" });
        }

        const user = rows[0];

        const token = jwt.sign({id: rows[0].id}, process.env.JWT , {expiresIn: '3h'})

        // Compare the plain text password
        if (user.password == password) {
            if(user.role == 'admin'){
                return res.status(201).json({ token: token , role: user.role });
            }
            return res.status(201).json({ token: token });
        } else {

            return res.status(401).json({ message: "Invalid credentials" });
            
        }


    } catch (err) {
        // Return internal server error
        res.status(500).json({ error: err.message });
    }
});

// Add this to your existing code
router.get('/Allusers', async (req, res) => {
    try {
        const db = await connectToDatabase();
        
        // Fetch all users from the database
        const [rows] = await db.query('SELECT * FROM users');
        
        // Return the users data
        return res.status(200).json(rows);
    } catch (err) {
        // Return internal server error
        console.error("Error executing query", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
