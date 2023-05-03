import express from "express";
import mongoose, { Schema } from "mongoose";
import { router } from "./routes.js";
import cors from "cors";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/offers")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database: " + err.message));

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
