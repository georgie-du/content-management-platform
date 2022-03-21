import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import postRoutes from "./routes/posts.js";

// set up express app
const app = express();
dotenv.config();

// middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// initialize routes
app.use("/posts", postRoutes);

const PORT = process.env.port || 5000;

//connect to database and listen to requests
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Listening for requests on port: ${PORT}`))
  )
  .catch((error) => console.log('Error', error.message));
