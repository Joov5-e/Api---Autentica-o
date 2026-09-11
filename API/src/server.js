import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import routes from './routes/index.js';
import jwt from 'jsonwebtoken';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const app = express();
routes(app)
const porta = process.env.PORTA || 3333;
const end = process.env.END || 'http://localhost';

app.listen(porta, () => {
  console.log(`Servidor rodando ${end}:${porta}`);
})