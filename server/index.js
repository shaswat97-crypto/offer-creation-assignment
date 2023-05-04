import express from "express";
import mongoose, { Schema } from "mongoose";
import { router } from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";
// import cors from "cors";
import * as dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database: " + err.message));

// app.use(cors());
app
.use(express.json())
.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)))
.use("/api", router);

app.listen(process.env.POST, () => {
  console.log("Server started on port " + process.env.POST);
});
