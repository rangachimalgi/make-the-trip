import express from 'express';
import dotenv from "dotenv"
import connectDB from './config/db.js'
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"

// Load environment variables from .env
dotenv.config();

//connect to database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Define your routes
app.use('/api/auth', authRoutes)

app.get('/api/data', (req, res) => {
  const data = ['item1', 'item2', 'item3'];
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
