import express from "express";
import { connectDB } from "./src/db.config.js";
import User from "./src/routes/user.js";
import "colors";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v1/", User);

app.listen(PORT, () => {
  console.log(`the app is listen to PORT:${PORT}`);
});
