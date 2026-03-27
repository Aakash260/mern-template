import express from "express";
import submitUser from "../controllers/user.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/submit", upload.array("documents"),submitUser);

export default router;
