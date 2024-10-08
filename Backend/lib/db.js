import mysql from 'mysql2'

let connection;

export const coonectToDatabase = async () => {
    if(!connection){
        connection = await  mysql.createConnection({
            host: process.env.DB_Host,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME

        })
    }
    return connection;
}