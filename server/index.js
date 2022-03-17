import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

// set up an express app
const app = express();

// middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// initialize routes
app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://georgiana:georgiana123@cluster0.rfjaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

//connect to database and listen to requests
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Listening for requests on port: ${PORT}`))
  )
  .catch((error) => console.log('Error',error.message));
