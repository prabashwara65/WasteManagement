import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let connection = null;

export const connectToDatabase = async () => {
    if (connection) {
        // If a connection already exists, return it
        return connection;
    }

    try {
        // Create a new connection if none exists
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log('Database connected successfully');
        return connection;

    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err; // Handle error in the application layer if needed
    }
};
