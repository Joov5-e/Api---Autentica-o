import   mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conect = mysql.createPool({
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit:0
});

export default conect;